package interfaces

// ConsoleProductResponse 是產品詳情響應
type ConsoleProductResponse struct {
	Item ProductWithMerchantInfo `json:"item"`
}

// AppProduct 是用於App的產品信息
type AppProduct struct {
	ID           int     `json:"id"`
	Name         string  `json:"name"`
	Description  string  `json:"description"`
	Price        float64 `json:"price"`
	Image        string  `json:"image"`
	MerchantID   int     `json:"merchantId"`
	MerchantName string  `json:"merchantName"`
	Stock        int     `json:"stock"`
}
