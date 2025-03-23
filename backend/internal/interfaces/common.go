package interfaces

// ErrorResponse 定義錯誤響應
type ErrorResponse struct {
	Error string `json:"error"`
}

// PageInfo 分頁信息
type PageInfo struct {
	HasNextPage     bool   `json:"hasNextPage"`
	HasPreviousPage bool   `json:"hasPreviousPage"`
	StartCursor     string `json:"startCursor"`
	EndCursor       string `json:"endCursor"`
}

type SuccessResponse struct {
	Message string `json:"message"`
}

type PaginatedResponse struct {
	Data       interface{} `json:"data"`
	Total      int64       `json:"total" example:"200"`
	Page       int         `json:"page" example:"1"`
	PageSize   int         `json:"page_size" example:"10"`
	TotalPages int         `json:"total_pages" example:"20"`
}
