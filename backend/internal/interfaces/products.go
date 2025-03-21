package interfaces

// 產品基本信息
type Product struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Price       float64 `json:"price"`
	StockAmount int     `json:"stockAmount"`
	Description string  `json:"description,omitempty"`
	Subtitle    string  `json:"subtitle,omitempty"`
	MerchantID  int     `json:"merchantId,omitempty"`
}

// 控制台創建產品請求
type ConsoleCreateProductRequest struct {
	Name        string  `json:"name" binding:"required"`
	Price       float64 `json:"price" binding:"required"`
	StockAmount int     `json:"stockAmount" binding:"required"`
	MerchantID  int     `json:"merchantId" binding:"required"`
	Description string  `json:"description"`
	Subtitle    string  `json:"subtitle"`
}

// 控制台更新產品請求
type ConsoleUpdateProductRequest struct {
	MerchantID  int     `json:"merchantId"`
	Name        string  `json:"name,omitempty"`
	Price       float64 `json:"price,omitempty"`
	StockAmount int     `json:"stockAmount,omitempty"`
	Description string  `json:"description,omitempty"`
	Subtitle    string  `json:"subtitle,omitempty"`
}

type ConsoleProductsResponse struct {
	Items      []ProductWithMerchantInfo `json:"items"`
	TotalCount int64                     `json:"totalCount"`
	PageInfo   PageInfo                  `json:"pageInfo"`
}

// 包含商家信息的產品
type ProductWithMerchantInfo struct {
	ID          int      `json:"id"`
	Name        string   `json:"name"`
	Price       float64  `json:"price"`
	StockAmount int      `json:"stockAmount"`
	MerchantID  int      `json:"merchantId"`
	Description string   `json:"description"`
	Subtitle    string   `json:"subtitle"`
	Merchant    Merchant `json:"merchant"`
}

// 包含商家信息的產品回應
type ConsoleProductWithMerchantInformationResponse struct {
	Item ProductWithMerchantInfo `json:"item"`
}

// App產品信息
type AppProductInformation struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Price       float64 `json:"price"`
	StockAmount int     `json:"stockAmount"`
	Description string  `json:"description"`
	Subtitle    string  `json:"subtitle"`
}

// App產品回應
type AppProductResponse struct {
	Item AppProductInformation `json:"item"`
}

// App產品列表回應
type AppProductsResponse struct {
	Items      []AppProductInformation `json:"items"`
	TotalCount int64                   `json:"totalCount"`
	PageInfo   PageInfo                `json:"pageInfo"`
}
