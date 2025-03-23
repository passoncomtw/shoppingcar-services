package interfaces

type AppAppendShoppingcarRequest struct {
	Amount int `json:"amount" binding:"required"`
}

// AddProductToShoppingcarRequest 添加產品到特定用戶購物車的請求
type AddProductToShoppingcarRequest struct {
	Amount int `json:"amount" binding:"required,min=1"`
}

type AppShoppingcarInformation struct {
	ID               int               `json:"id"`
	ProductCount     int               `json:"productCount"`
	TotalAmount      float64           `json:"totalAmount"`
	User             User              `json:"user"`
	ShoppingcarItems []ShoppingcarItem `json:"shoppingcarItems"`
}

type ConsoleShoppingcarsResponse struct {
	Items    []ConsoleShoppingcarItem `json:"items"`
	PageInfo PageInfo                 `json:"pageInfo"`
}
