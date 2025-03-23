package interfaces

// App訂單詳細信息
type AppItemInformation struct {
	ID          string      `json:"id"`
	TotalAmount float64     `json:"totalAmount"`
	OrderItems  []OrderItem `json:"orderItems"`
}

type AppCreateOrderRequest struct {
	ShoppingcarItemIds []int `json:"shoppingcarItemIds" binding:"required"`
}

type AppCreateOrderResponse struct {
	OrderIds []string `json:"orderIds"`
}

type AppOrdersResponse struct {
	Items      []AppOrderItem `json:"items"`
	TotalCount int64          `json:"totalCount"`
	PageInfo   PageInfo       `json:"pageInfo"`
}

type AppOrderInformationResponse struct {
	Item AppItemInformation `json:"item"`
}

type ConsoleOrderItem struct {
	ID           string                 `json:"id"`
	ProductCount int                    `json:"productCount"`
	TotalAmount  float64                `json:"totalAmount"`
	User         ConsoleUserInformation `json:"user"`
}

type ConsoleOrdersResponse struct {
	Items      []ConsoleOrderDetail `json:"items"`
	TotalCount int64                `json:"totalCount"`
	PageInfo   PageInfo             `json:"pageInfo"`
}
