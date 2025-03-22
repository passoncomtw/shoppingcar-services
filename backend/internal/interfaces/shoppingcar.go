package interfaces

// ShoppingcarItem 購物車項
type ShoppingcarItem struct {
	ID        int     `json:"id"`
	ProductID int     `json:"productId"`
	Amount    int     `json:"amount"`
	Price     float64 `json:"price"`
	Name      string  `json:"name"`
	Image     string  `json:"image"`
}

// Shoppingcar 購物車
type Shoppingcar struct {
	ID      int               `json:"id"`
	UserID  int               `json:"userId"`
	Items   []ShoppingcarItem `json:"items"`
	Total   float64           `json:"total"`
	Created string            `json:"created"`
	Updated string            `json:"updated"`
}

// ShoppingcarWithUserInfo 包含用戶信息的購物車
type ShoppingcarWithUserInfo struct {
	ID         int               `json:"id"`
	UserID     int               `json:"userId"`
	UserName   string            `json:"userName"`
	UserEmail  string            `json:"userEmail"`
	Items      []ShoppingcarItem `json:"items"`
	Total      float64           `json:"total"`
	ItemsCount int               `json:"itemsCount"`
	Created    string            `json:"created"`
	Updated    string            `json:"updated"`
}

// AppAddProductToShoppingcarRequest 添加產品到購物車請求
type AppAddProductToShoppingcarRequest struct {
	Amount int `json:"amount" binding:"required,gt=0"`
}

// AppShoppingcarResponse 購物車響應
type AppShoppingcarResponse struct {
	Item Shoppingcar `json:"item"`
}

// 後台購物車信息
type ConsoleShoppingcarItem struct {
	ID           int                    `json:"id"`
	ProductCount int                    `json:"productCount"`
	TotalAmount  float64                `json:"totalAmount"`
	User         ConsoleUserInformation `json:"user"`
}
