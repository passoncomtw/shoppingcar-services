package interfaces

// App商家回應
type AppMerchantInformation struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Phone string `json:"phone"`
	Email string `json:"email"`
}

// App商家列表回應
type AppMerchantsResponse struct {
	Items      []AppMerchantInformation `json:"items"`
	TotalCount int64                    `json:"totalCount"`
	PageInfo   PageInfo                 `json:"pageInfo"`
}
