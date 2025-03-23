package interfaces

type LoginRequest struct {
	Phone    string `json:"phone" binding:"required" example:"0987654321"`
	Password string `json:"password" binding:"required" example:"a12345678"`
}

type LoginResponse struct {
	Token string `json:"token"  example:"0987654321"`
	User  User   `json:"user"`
}

// 後台用戶登入請求
type ConsoleLoginRequest struct {
	Account  string `json:"account" example: "admin" binding:"required"`
	Password string `json:"password" example:"a12345678" binding:"required"`
}

// 後台用戶信息
type ConsoleUser struct {
	ID      uint   `json:"id"`
	Account string `json:"account"`
}

// 後台登入響應
type ConsoleLoginResponse struct {
	Token string      `json:"token"`
	User  ConsoleUser `json:"user"`
}
