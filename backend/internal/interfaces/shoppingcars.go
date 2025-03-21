package interfaces

type AppAppendShoppingcarRequest struct {
	Amount int `json:"amount" binding:"required"`
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
