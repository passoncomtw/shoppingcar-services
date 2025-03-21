package websocketManager

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

const (
	// 心跳間隔設置為15秒，避開30秒超時
	heartbeatInterval = 15 * time.Second
	// 連接超時設置為25秒
	readTimeout  = 30 * time.Second
	writeTimeout = 10 * time.Second
	// 最大重連次數
	maxReconnectAttempts = 5
	// 重連基礎間隔
	baseReconnectDelay = 2 * time.Second
	// 非活躍連接超時（5分鐘）
	inactivityTimeout = 5 * time.Minute
)

// 客戶端結構體，代表一個 WebSocket 連接
type Client struct {
	ID              string          // 客戶端唯一標識
	UserID          uint            // 用戶 ID
	Conn            *websocket.Conn // WebSocket 連接
	Send            chan []byte     // 發送訊息的通道
	manager         *Manager        // 所屬的管理器
	LastActivity    time.Time       // 最後活動時間
	IsAuthed        bool            // 是否已認證
	reconnectCount  int             // 重連次數
	closeChan       chan struct{}   // 關閉通道
	heartbeatTicker *time.Ticker    // 心跳定時器
	connMutex       sync.Mutex      // 連接鎖，防止並發讀寫
}

// 客戶端狀態
type ClientState int

const (
	StateDisconnected ClientState = iota
	StateConnecting
	StateConnected
	StateFailed
)

// 訊息結構體
type Message struct {
	Type    string      `json:"type"`              // 訊息類型
	Content interface{} `json:"content,omitempty"` // 訊息內容
	From    string      `json:"from,omitempty"`    // 發送方
	To      string      `json:"to,omitempty"`      // 接收方
}

// 心跳訊息
type HeartbeatMessage struct {
	Type      string `json:"type"`
	Timestamp int64  `json:"timestamp"`
}

// WebSocket 管理器結構體
type Manager struct {
	clients     map[string]*Client               // 所有已連接的客戶端
	userClients map[uint]map[string]bool         // 用戶ID對應的客戶端map
	broadcast   chan []byte                      // 廣播訊息的通道
	register    chan *Client                     // 註冊客戶端的通道
	unregister  chan *Client                     // 註銷客戶端的通道
	shutdown    chan struct{}                    // 關閉的通道
	auth        func(token string) (uint, error) // 認證函數
	mutex       sync.RWMutex                     // 讀寫鎖
}

// 創建新的 WebSocket 管理器
func NewManager(authFunc func(token string) (uint, error)) *Manager {
	return &Manager{
		clients:     make(map[string]*Client),
		userClients: make(map[uint]map[string]bool),
		broadcast:   make(chan []byte, 100), // 增大緩衝區
		register:    make(chan *Client, 10),
		unregister:  make(chan *Client, 10),
		shutdown:    make(chan struct{}),
		auth:        authFunc,
		mutex:       sync.RWMutex{},
	}
}

// 啟動 WebSocket 管理器
func (manager *Manager) Start(ctx context.Context) {
	log.Println("WebSocket Manager: Starting...")

	// 非活躍連接檢查定時器
	inactivityTicker := time.NewTicker(1 * time.Minute)
	defer inactivityTicker.Stop()

	for {
		select {
		case <-ctx.Done():
			log.Println("WebSocket Manager: Shutting down...")
			// 關閉所有客戶端連接
			manager.mutex.Lock()
			for _, client := range manager.clients {
				close(client.Send)
				if client.closeChan != nil {
					close(client.closeChan)
				}
				if client.heartbeatTicker != nil {
					client.heartbeatTicker.Stop()
				}
				client.Conn.Close()
			}
			manager.mutex.Unlock()
			return

		case client := <-manager.register:
			manager.mutex.Lock()
			manager.clients[client.ID] = client
			manager.mutex.Unlock()
			log.Printf("WebSocket Manager: Client %s registered\n", client.ID)

		case client := <-manager.unregister:
			if _, ok := manager.clients[client.ID]; ok {
				manager.mutex.Lock()

				// 從用戶-客戶端映射中移除
				if client.IsAuthed {
					delete(manager.userClients[client.UserID], client.ID)
					// 如果用戶沒有其他客戶端連接，則刪除用戶映射
					if len(manager.userClients[client.UserID]) == 0 {
						delete(manager.userClients, client.UserID)
					}
				}

				// 停止心跳
				if client.heartbeatTicker != nil {
					client.heartbeatTicker.Stop()
				}

				// 關閉信號通道
				if client.closeChan != nil {
					close(client.closeChan)
				}

				// 關閉發送通道
				close(client.Send)
				// 從客戶端列表中刪除
				delete(manager.clients, client.ID)

				manager.mutex.Unlock()
				log.Printf("WebSocket Manager: Client %s unregistered\n", client.ID)
			}

		case message := <-manager.broadcast:
			// 廣播消息給所有客戶端
			manager.mutex.RLock()
			for id, client := range manager.clients {
				select {
				case client.Send <- message:
				default:
					client.connMutex.Lock()
					if client.heartbeatTicker != nil {
						client.heartbeatTicker.Stop()
					}
					if client.closeChan != nil {
						close(client.closeChan)
					}
					client.Conn.Close()
					client.connMutex.Unlock()

					manager.mutex.RUnlock()
					manager.mutex.Lock()

					// 從用戶-客戶端映射中移除
					if client.IsAuthed {
						delete(manager.userClients[client.UserID], client.ID)
						if len(manager.userClients[client.UserID]) == 0 {
							delete(manager.userClients, client.UserID)
						}
					}

					close(client.Send)
					delete(manager.clients, id)
					manager.mutex.Unlock()
					manager.mutex.RLock()
					log.Printf("WebSocket Manager: Client %s removed (failed to send)\n", id)
				}
			}
			manager.mutex.RUnlock()

		case <-inactivityTicker.C:
			// 定期檢查非活躍連接
			threshold := time.Now().Add(-inactivityTimeout)
			manager.mutex.Lock()
			for id, client := range manager.clients {
				if client.LastActivity.Before(threshold) {
					log.Printf("WebSocket Manager: Client %s inactive for too long, closing connection\n", id)
					client.connMutex.Lock()
					if client.heartbeatTicker != nil {
						client.heartbeatTicker.Stop()
					}
					if client.closeChan != nil {
						close(client.closeChan)
					}
					client.Conn.Close()
					client.connMutex.Unlock()

					close(client.Send)

					// 從用戶-客戶端映射中移除
					if client.IsAuthed {
						delete(manager.userClients[client.UserID], client.ID)
						if len(manager.userClients[client.UserID]) == 0 {
							delete(manager.userClients, client.UserID)
						}
					}

					delete(manager.clients, id)
					log.Printf("WebSocket Manager: Client %s removed due to inactivity\n", id)
				}
			}
			manager.mutex.Unlock()
		}
	}
}

// 驗證客戶端
func (manager *Manager) AuthenticateClient(client *Client, token string) error {
	userID, err := manager.auth(token)
	if err != nil {
		return err
	}

	manager.mutex.Lock()
	defer manager.mutex.Unlock()

	client.UserID = userID
	client.IsAuthed = true

	// 將客戶端添加到用戶-客戶端映射
	if _, exists := manager.userClients[userID]; !exists {
		manager.userClients[userID] = make(map[string]bool)
	}
	manager.userClients[userID][client.ID] = true

	log.Printf("WebSocket Manager: Client %s authenticated for user %d\n", client.ID, userID)
	return nil
}

// 廣播訊息給所有已認證的客戶端
func (manager *Manager) BroadcastToAll(message interface{}) error {
	msgBytes, err := json.Marshal(message)
	if err != nil {
		return err
	}

	manager.broadcast <- msgBytes
	return nil
}

// 向指定用戶發送訊息
func (manager *Manager) SendToUser(userID uint, message interface{}) error {
	msgBytes, err := json.Marshal(message)
	if err != nil {
		return err
	}

	manager.mutex.RLock()
	defer manager.mutex.RUnlock()

	// 檢查用戶是否有連接的客戶端
	clientMap, exists := manager.userClients[userID]
	if !exists || len(clientMap) == 0 {
		return fmt.Errorf("no connected clients for user %d", userID)
	}

	// 發送訊息給用戶的所有客戶端
	for clientID := range clientMap {
		if client, ok := manager.clients[clientID]; ok && client.IsAuthed {
			select {
			case client.Send <- msgBytes:
				// 訊息已送入通道
			default:
				// 發送通道已滿或已關閉，移除客戶端
				client.connMutex.Lock()
				if client.heartbeatTicker != nil {
					client.heartbeatTicker.Stop()
				}
				if client.closeChan != nil {
					close(client.closeChan)
				}
				client.Conn.Close()
				client.connMutex.Unlock()

				// 移除用戶客戶端映射
				delete(manager.userClients[userID], clientID)
				if len(manager.userClients[userID]) == 0 {
					delete(manager.userClients, userID)
				}

				// 移除客戶端
				close(client.Send)
				delete(manager.clients, clientID)
				log.Printf("WebSocket Manager: Client %s removed (failed to send to user)\n", clientID)
			}
		}
	}

	return nil
}

// 客戶端讀取訊息
func (client *Client) ReadPump() {
	// 初始化關閉通道
	client.closeChan = make(chan struct{})

	defer func() {
		client.manager.unregister <- client
		client.Conn.Close()
	}()

	// 設置讀取參數
	client.Conn.SetReadLimit(4096) // 4KB
	client.Conn.SetReadDeadline(time.Now().Add(readTimeout))

	// 設置Pong處理器，更新最後活動時間
	client.Conn.SetPongHandler(func(string) error {
		client.connMutex.Lock()
		client.Conn.SetReadDeadline(time.Now().Add(readTimeout))
		client.LastActivity = time.Now()
		client.connMutex.Unlock()
		return nil
	})

	// 啟動心跳
	client.StartHeartbeat()

	for {
		select {
		case <-client.closeChan:
			return
		default:
			_, message, err := client.Conn.ReadMessage()
			if err != nil {
				if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
					log.Printf("WebSocket Manager: Client %s unexpected close: %v\n", client.ID, err)
				}
				return
			}

			client.connMutex.Lock()
			client.LastActivity = time.Now()
			client.Conn.SetReadDeadline(time.Now().Add(readTimeout))
			client.connMutex.Unlock()

			// 處理接收到的訊息
			var msg Message
			if err := json.Unmarshal(message, &msg); err != nil {
				log.Printf("WebSocket Manager: Error unmarshaling message from client %s: %v\n", client.ID, err)
				continue
			}

			// 處理心跳訊息
			if msg.Type == "heartbeat" {
				// 客戶端發送的心跳，直接回應
				heartbeatResponse := HeartbeatMessage{
					Type:      "heartbeat",
					Timestamp: time.Now().UnixNano() / int64(time.Millisecond),
				}
				responseBytes, _ := json.Marshal(heartbeatResponse)
				client.Send <- responseBytes
				continue
			}

			// 處理其他訊息...
			log.Printf("WebSocket Manager: Received message from client %s: %s\n", client.ID, message)
		}
	}
}

// 客戶端寫入訊息
func (client *Client) WritePump() {
	defer func() {
		client.Conn.Close()
	}()

	for {
		select {
		case <-client.closeChan:
			return
		case message, ok := <-client.Send:
			client.connMutex.Lock()
			client.Conn.SetWriteDeadline(time.Now().Add(writeTimeout))
			client.connMutex.Unlock()

			if !ok {
				// 通道已關閉
				client.connMutex.Lock()
				client.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				client.connMutex.Unlock()
				return
			}

			client.connMutex.Lock()
			w, err := client.Conn.NextWriter(websocket.TextMessage)
			if err != nil {
				client.connMutex.Unlock()
				return
			}

			w.Write(message)

			// 將佇列中的其他訊息也一起發送
			n := len(client.Send)
			for i := 0; i < n; i++ {
				w.Write([]byte{'\n'})
				w.Write(<-client.Send)
			}

			if err := w.Close(); err != nil {
				client.connMutex.Unlock()
				return
			}
			client.connMutex.Unlock()
		}
	}
}

// 開始心跳
func (client *Client) StartHeartbeat() {
	// 停止舊的心跳計時器（如果存在）
	if client.heartbeatTicker != nil {
		client.heartbeatTicker.Stop()
	}

	// 創建新的心跳計時器
	client.heartbeatTicker = time.NewTicker(heartbeatInterval)

	// 啟動心跳協程
	go func() {
		for {
			select {
			case <-client.closeChan:
				return
			case <-client.heartbeatTicker.C:
				// 發送Ping訊息
				client.connMutex.Lock()
				if err := client.Conn.WriteControl(websocket.PingMessage, []byte{}, time.Now().Add(writeTimeout)); err != nil {
					log.Printf("WebSocket Manager: Client %s ping error: %v\n", client.ID, err)
					client.connMutex.Unlock()
					// 嘗試重連
					client.attemptReconnect()
					return
				}
				client.connMutex.Unlock()

				// 發送應用層心跳訊息
				heartbeat := HeartbeatMessage{
					Type:      "heartbeat",
					Timestamp: time.Now().UnixNano() / int64(time.Millisecond),
				}
				heartbeatBytes, _ := json.Marshal(heartbeat)

				select {
				case client.Send <- heartbeatBytes:
					// 心跳已送入通道
				default:
					// 發送通道已滿，可能需要處理
					log.Printf("WebSocket Manager: Client %s send channel full, cannot send heartbeat\n", client.ID)
				}
			}
		}
	}()
}

// 嘗試重連
func (client *Client) attemptReconnect() {
	if client.reconnectCount >= maxReconnectAttempts {
		log.Printf("WebSocket Manager: Client %s exceeded maximum reconnection attempts\n", client.ID)
		return
	}

	client.reconnectCount++
	backoff := time.Duration(1<<uint(client.reconnectCount-1)) * baseReconnectDelay
	if backoff > 30*time.Second {
		backoff = 30 * time.Second
	}

	log.Printf("WebSocket Manager: Client %s attempting reconnect in %v (attempt %d/%d)\n",
		client.ID, backoff, client.reconnectCount, maxReconnectAttempts)

	time.Sleep(backoff)

	// 實際的重連邏輯需要客戶端實現，這裡是服務端
	// 在真實應用中，客戶端應處理重連邏輯
}

// 關閉連接
func (manager *Manager) Shutdown() {
	close(manager.shutdown)
}
