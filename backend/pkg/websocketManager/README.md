# WebSocket 管理器

這個 WebSocket 管理器提供了可靠的連接管理功能，特別是針對解決 30 秒斷線問題的穩健解決方案。

## 主要特性

- **自動心跳機制**：每 15 秒發送心跳，避開 30 秒的連接超時問題
- **雙層心跳保障**：同時使用 WebSocket 協議的 Ping/Pong 框架和應用層心跳
- **斷線自動重連**：內建指數退避重連機制，最多重試 5 次
- **連接狀態監控**：即時追蹤連接狀態，支持健康檢查
- **事件驅動架構**：提供簡潔的事件回調 API (OnConnect, OnMessage, OnError, OnClose)
- **高效能緩衝區**：針對大量連接和頻繁消息進行優化

## 服務端組件

### Manager

WebSocket連接的中央管理器，負責：

- 處理客戶端註冊與註銷
- 消息廣播和定向發送
- 認證管理
- 非活躍連接清理

### Client

服務端的客戶端連接表示，提供：

- 讀寫協程
- 心跳機制
- 連接狀態管理

## 客戶端組件

### WebSocketClient

客戶端的 WebSocket 連接封裝，特點：

- 完整的生命週期管理
- 自動心跳和重連
- 事件驅動的消息處理
- 簡潔的發送/接收 API

## 使用方法

### 服務端

```go
// 創建身份驗證函數
authFunc := func(token string) (uint, error) {
    // 驗證邏輯...
    return userId, nil
}

// 創建 WebSocket 管理器
manager := websocketManager.NewManager(authFunc)

// 啟動管理器
ctx, cancel := context.WithCancel(context.Background())
defer cancel()
go manager.Start(ctx)

// 設置 WebSocket 路由
http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
    // 升級連接...
    // 創建客戶端...
    // 註冊客戶端到管理器...
})

// 啟動 HTTP 服務器
http.ListenAndServe(":8080", nil)
```

### 客戶端

```go
// 創建客戶端
client := websocketManager.NewWebSocketClient("ws://example.com/ws", "auth-token")

// 設置回調函數
client.OnConnect = func() {
    fmt.Println("連接成功")
}

client.OnMessage = func(data []byte) {
    fmt.Printf("收到消息: %s\n", data)
}

// 連接服務器
err := client.Connect()
if err != nil {
    log.Fatalf("連接失敗: %v", err)
}

// 發送消息
client.SendMessage("chat", "Hello!")

// 關閉連接
client.Close()
```

## 最佳實踐

1. **心跳間隔設置**：使用 15 秒心跳間隔，確保連接保持活躍

2. **超時設置**：
   - 設置 ReadTimeout 為 30-35 秒
   - 設置 WriteTimeout 為 10 秒

3. **緩衝區大小**：
   - 根據消息頻率和大小調整 Send 通道容量
   - 對於高頻消息系統，考慮增大緩衝區（100-1000 條消息）

4. **重連策略**：
   - 啟用自動重連
   - 使用指數退避策略進行重連
   - 設置合理的最大重試次數

5. **錯誤處理**：
   - 實現所有錯誤回調
   - 記錄重要的連接事件
   - 區分不同類型的連接錯誤

## 性能優化

- 使用緩衝通道避免阻塞
- 合併小消息減少傳輸開銷
- 使用互斥鎖確保線程安全
- 定期清理非活躍連接

## 安全建議

- 始終實現身份驗證
- 在生產環境中檢查 Origin 頭
- 使用 HTTPS/WSS 進行安全通信
- 實施消息驗證和sanitization

## 已知限制

- 單一服務器實例的擴展性有限
- 需要使用外部系統（如 Redis）實現集群部署和跨實例通信

## 依賴項

- github.com/gorilla/websocket 