package interfaces

// OrderItem 訂單項
type OrderItem struct {
	ID        int     `json:"id"`
	OrderID   int     `json:"orderId"`
	ProductID int     `json:"productId"`
	Amount    int     `json:"amount"`
	Price     float64 `json:"price"`
	Name      string  `json:"name"`
	Image     string  `json:"image"`
}

// AppOrderItem 前端訂單簡略信息
type AppOrderItem struct {
	ID      int     `json:"id"`
	IsPaid  bool    `json:"isPaid"`
	Total   float64 `json:"total"`
	Created string  `json:"created"`
	Updated string  `json:"updated"`
}

// AppOrder 前端訂單詳情
type AppOrder struct {
	ID      int         `json:"id"`
	UserID  int         `json:"userId"`
	Items   []OrderItem `json:"items"`
	Total   float64     `json:"total"`
	IsPaid  bool        `json:"isPaid"`
	Created string      `json:"created"`
	Updated string      `json:"updated"`
}

// ConsoleOrder 控制台訂單詳情
type ConsoleOrder struct {
	ID        int         `json:"id"`
	UserID    int         `json:"userId"`
	UserName  string      `json:"userName"`
	UserEmail string      `json:"userEmail"`
	Items     []OrderItem `json:"items"`
	Total     float64     `json:"total"`
	IsPaid    bool        `json:"isPaid"`
	Created   string      `json:"created"`
	Updated   string      `json:"updated"`
}

// ConsoleOrderDetail 控制台訂單列表項
type ConsoleOrderDetail struct {
	ID        int     `json:"id"`
	UserID    int     `json:"userId"`
	UserName  string  `json:"userName"`
	UserEmail string  `json:"userEmail"`
	Total     float64 `json:"total"`
	IsPaid    bool    `json:"isPaid"`
	Items     int     `json:"items"`
	Created   string  `json:"created"`
	Updated   string  `json:"updated"`
}

// AppOrderResponse 前端訂單詳情響應
type AppOrderResponse struct {
	Item AppOrder `json:"item"`
}

// ConsoleOrderResponse 控制台訂單詳情響應
type ConsoleOrderResponse struct {
	Item ConsoleOrder `json:"item"`
}

// ConsoleUpdateOrderPaymentRequest 更新訂單支付狀態請求
type ConsoleUpdateOrderPaymentRequest struct {
	IsPaid bool `json:"isPaid" binding:"required"`
}
