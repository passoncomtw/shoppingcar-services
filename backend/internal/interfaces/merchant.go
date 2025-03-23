package interfaces

// Merchant 定義商家
type Merchant struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Address     string `json:"address"`
	Phone       string `json:"phone"`
	Email       string `json:"email"`
	Logo        string `json:"logo"`
	Status      int    `json:"status"`
	CreatedAt   string `json:"createdAt"`
	UpdatedAt   string `json:"updatedAt"`
}

// AppMerchant 用於App的商家信息
type AppMerchant struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Logo        string `json:"logo"`
}

// ConsoleCreateMerchantRequest 創建商家請求
type ConsoleCreateMerchantRequest struct {
	Name     string `json:"name" binding:"required"`
	Phone    string `json:"phone" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

// ConsoleUpdateMerchantRequest 更新商家請求
type ConsoleUpdateMerchantRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description" binding:"required"`
	Address     string `json:"address" binding:"required"`
	Phone       string `json:"phone" binding:"required"`
	Email       string `json:"email" binding:"required,email"`
	Logo        string `json:"logo" binding:"required"`
	Status      int    `json:"status" binding:"required,oneof=0 1"`
	Password    string `json:"password" binding:"omitempty,min=6"`
}

// ConsoleMerchantResponse 商家詳情響應
type ConsoleMerchantResponse struct {
	Item Merchant `json:"item"`
}

// ConsoleMerchantsResponse 商家列表響應
type ConsoleMerchantsResponse struct {
	Items      []Merchant `json:"items"`
	TotalCount int64      `json:"totalCount"`
	PageInfo   PageInfo   `json:"pageInfo"`
}

// ConsoleMerchantItemsResponse 商家選項列表響應
type ConsoleMerchantItemsResponse struct {
	Items []Merchant `json:"items"`
}

// AppMerchantResponse 商家詳情響應（App）
type AppMerchantResponse struct {
	Item AppMerchant `json:"item"`
}
