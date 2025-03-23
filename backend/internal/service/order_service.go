package service

import (
	"errors"
	"time"

	"github.com/passoncomtw/shoppingcar-services/internal/interfaces"
)

var (
	// ErrEmptyShoppingcar 購物車為空
	ErrEmptyShoppingcar = errors.New("購物車為空")
	// ErrInsufficientStock 庫存不足
	ErrInsufficientStock = errors.New("庫存不足")
	// ErrOrderNotFound 訂單不存在
	ErrOrderNotFound = errors.New("訂單不存在")
	// ErrUnauthorized 未授權訪問
	ErrUnauthorized = errors.New("未授權訪問該訂單")
)

// 數據庫訂單模型
type Order struct {
	ID           string    `gorm:"primaryKey;column:id;type:uuid" json:"id"`
	UserID       int       `gorm:"column:user_id;not null" json:"user_id"`
	ProductCount int       `gorm:"column:product_count;default:0" json:"product_count"`
	TotalAmount  float64   `gorm:"column:total_amount;default:0" json:"total_amount"`
	IsPaid       bool      `gorm:"column:is_paid;default:false" json:"is_paid"`
	CreatedAt    time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt    time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Order) TableName() string {
	return "orders"
}

// 數據庫訂單項目模型
type OrderItem struct {
	ID         int       `gorm:"primaryKey;column:id" json:"id"`
	ProductID  int       `gorm:"column:product_id;not null" json:"product_id"`
	MerchantID int       `gorm:"column:merchant_id;not null" json:"merchant_id"`
	OrderID    string    `gorm:"column:order_id;not null;type:uuid" json:"order_id"`
	Amount     int       `gorm:"column:amount;not null" json:"amount"`
	CreatedAt  time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt  time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (OrderItem) TableName() string {
	return "order_items"
}

// OrderService 訂單服務接口
type OrderService interface {
	// 從購物車創建訂單
	CreateOrderFromShoppingcar(userID int) ([]interfaces.AppOrderItem, error)
	// 獲取用戶訂單列表
	GetOrdersByUser(userID, page, pageSize int) (*interfaces.AppOrdersResponse, error)
	// 獲取訂單信息（包含驗證用戶身份）
	GetOrderInformation(orderID, userID int) (*interfaces.AppOrder, error)
	// 獲取訂單列表（管理員）
	GetOrders(page, pageSize int) (*interfaces.ConsoleOrdersResponse, error)
	// 獲取訂單詳情（管理員）
	GetOrder(orderID int) (*interfaces.ConsoleOrder, error)
	// 更新訂單支付狀態
	UpdateOrderPayment(orderID int, isPaid bool) (*interfaces.ConsoleOrder, error)
}

// DefaultOrderService 訂單服務實現
type DefaultOrderService struct {
	shoppingcarService ShoppingcarService
}

// NewOrderService 創建新的訂單服務
func NewOrderService(shoppingcarService ShoppingcarService) OrderService {
	return &DefaultOrderService{
		shoppingcarService: shoppingcarService,
	}
}

// CreateOrderFromShoppingcar 從購物車創建訂單
func (s *DefaultOrderService) CreateOrderFromShoppingcar(userID int) ([]interfaces.AppOrderItem, error) {
	// 獲取用戶購物車
	shoppingcarResp, err := s.shoppingcarService.GetShoppingcarByUser(userID)
	if err != nil {
		return nil, err
	}

	shoppingcarItems := shoppingcarResp.ShoppingcarItems
	shoppingcarItemsCount := len(shoppingcarItems)
	if shoppingcarItemsCount == 0 {
		return nil, ErrEmptyShoppingcar
	}

	// 模擬創建訂單
	orderItems := []interfaces.AppOrderItem{
		{
			ID:      1,
			IsPaid:  false,
			Total:   shoppingcarResp.TotalAmount,
			Created: "2023-01-01 00:00:00",
			Updated: "2023-01-01 00:00:00",
		},
	}

	// 清空購物車
	err = s.shoppingcarService.ClearShoppingcar(userID)
	if err != nil {
		return nil, err
	}

	return orderItems, nil
}

// GetOrdersByUser 獲取用戶訂單列表
func (s *DefaultOrderService) GetOrdersByUser(userID, page, pageSize int) (*interfaces.AppOrdersResponse, error) {
	// 模擬獲取用戶訂單
	items := make([]interfaces.AppOrderItem, 0)
	for i := 1; i <= 5; i++ {
		items = append(items, interfaces.AppOrderItem{
			ID:      i,
			IsPaid:  i%2 == 0,
			Total:   float64(i) * 100,
			Created: "2023-01-01 00:00:00",
			Updated: "2023-01-01 00:00:00",
		})
	}

	return &interfaces.AppOrdersResponse{
		Items: items,
	}, nil
}

// GetOrderInformation 獲取訂單信息（包含驗證用戶身份）
func (s *DefaultOrderService) GetOrderInformation(orderID, userID int) (*interfaces.AppOrder, error) {
	// 模擬獲取訂單
	// 在真實場景中會檢查訂單是否屬於該用戶
	if orderID > 10 {
		return nil, ErrOrderNotFound
	}

	// 模擬檢查訂單所屬用戶
	order := s.mockGetOrder(orderID)
	if order.UserID != userID {
		return nil, ErrUnauthorized
	}

	return order, nil
}

// GetOrders 獲取訂單列表（管理員）
func (s *DefaultOrderService) GetOrders(page, pageSize int) (*interfaces.ConsoleOrdersResponse, error) {
	// 模擬獲取所有訂單
	items := make([]interfaces.ConsoleOrderDetail, 0)
	for i := 1; i <= 10; i++ {
		items = append(items, interfaces.ConsoleOrderDetail{
			ID:        i,
			UserID:    i * 100,
			UserName:  "用戶 " + string(rune(i)),
			UserEmail: "user" + string(rune(i)) + "@example.com",
			Total:     float64(i) * 100,
			IsPaid:    i%2 == 0,
			Items:     i,
			Created:   "2023-01-01 00:00:00",
			Updated:   "2023-01-01 00:00:00",
		})
	}

	return &interfaces.ConsoleOrdersResponse{
		Items: items,
		PageInfo: interfaces.PageInfo{
			HasNextPage:     page < 5,
			HasPreviousPage: page > 1,
			StartCursor:     "cursor1",
			EndCursor:       "cursor10",
		},
	}, nil
}

// GetOrder 獲取訂單詳情（管理員）
func (s *DefaultOrderService) GetOrder(orderID int) (*interfaces.ConsoleOrder, error) {
	// 檢查訂單是否存在
	if orderID > 10 {
		return nil, ErrOrderNotFound
	}

	// 模擬獲取訂單詳情
	orderItems := make([]interfaces.OrderItem, 0)
	for i := 1; i <= 3; i++ {
		orderItems = append(orderItems, interfaces.OrderItem{
			ID:        i,
			OrderID:   orderID,
			ProductID: i * 10,
			Amount:    i,
			Price:     float64(i) * 50,
			Name:      "產品 " + string(rune(i)),
			Image:     "https://example.com/image.jpg",
		})
	}

	return &interfaces.ConsoleOrder{
		ID:        orderID,
		UserID:    100,
		UserName:  "用戶 A",
		UserEmail: "userA@example.com",
		Items:     orderItems,
		Total:     300,
		IsPaid:    orderID%2 == 0,
		Created:   "2023-01-01 00:00:00",
		Updated:   "2023-01-01 00:00:00",
	}, nil
}

// UpdateOrderPayment 更新訂單支付狀態
func (s *DefaultOrderService) UpdateOrderPayment(orderID int, isPaid bool) (*interfaces.ConsoleOrder, error) {
	// 檢查訂單是否存在
	if orderID > 10 {
		return nil, ErrOrderNotFound
	}

	// 獲取訂單詳情
	order, err := s.GetOrder(orderID)
	if err != nil {
		return nil, err
	}

	// 更新支付狀態
	order.IsPaid = isPaid
	order.Updated = "2023-01-02 00:00:00" // 模擬更新時間

	return order, nil
}

// 模擬獲取訂單
func (s *DefaultOrderService) mockGetOrder(orderID int) *interfaces.AppOrder {
	// 建立測試訂單項
	orderItems := make([]interfaces.OrderItem, 0)
	for i := 1; i <= 3; i++ {
		orderItems = append(orderItems, interfaces.OrderItem{
			ID:        i,
			OrderID:   orderID,
			ProductID: i * 10,
			Amount:    i,
			Price:     float64(i) * 50,
			Name:      "產品 " + string(rune(i)),
			Image:     "https://example.com/image.jpg",
		})
	}

	// 計算總金額
	var total float64
	for _, item := range orderItems {
		total += item.Price * float64(item.Amount)
	}

	return &interfaces.AppOrder{
		ID:      orderID,
		UserID:  100,
		Items:   orderItems,
		Total:   total,
		IsPaid:  orderID%2 == 0,
		Created: "2023-01-01 00:00:00",
		Updated: "2023-01-01 00:00:00",
	}
}
