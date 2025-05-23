package handler

import (
	"net/http"
	"strings"

	"github.com/passoncomtw/shoppingcar-services/internal/interfaces"
	"github.com/passoncomtw/shoppingcar-services/internal/service"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	authService    service.AuthService
	userService    service.UserService
	backendService service.BackendUserService
}

func NewAuthHandler(
	authService service.AuthService,
	userService service.UserService,
	backendService service.BackendUserService,
) *AuthHandler {
	return &AuthHandler{
		authService:    authService,
		userService:    userService,
		backendService: backendService,
	}
}

// 用戶登入
// @Summary App 用戶登入
// @Description 驗證用戶憑據並返回 JWT 令牌
// @Tags AppAuthorization
// @Accept json
// @Produce json
// @Param data body interfaces.LoginRequest true "登入信息"
// @Success 200 {object} interfaces.LoginResponse "登入成功"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 401 {object} interfaces.ErrorResponse "登入失敗"
// @Router /app/login [post]
func (h *AuthHandler) UserLogin(c *gin.Context) {
	var req interfaces.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	token, user, err := h.authService.Login(req.Phone, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, interfaces.LoginResponse{Token: token, User: user})
}

// 後台登入
// @Summary 後台控制台登入
// @Description 驗證後台用戶憑據並返回 JWT 令牌
// @Tags ConsoleAuthorization
// @Accept json
// @Produce json
// @Security Bearer
// @Param data body interfaces.ConsoleLoginRequest true "後台登入信息"
// @Success 200 {object} interfaces.ConsoleLoginResponse "登入成功"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 401 {object} interfaces.ErrorResponse "登入失敗"
// @Router /console/login [post]
func (h *AuthHandler) ConsoleLogin(c *gin.Context) {
	var req interfaces.ConsoleLoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	token, user, err := h.backendService.Login(req.Account, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, interfaces.ConsoleLoginResponse{
		Token: token,
		User: interfaces.ConsoleUser{
			ID:      user.ID,
			Account: user.Account,
		},
	})
}

// 用戶登出
// @Summary 用戶登出
// @Description 使當前 JWT 令牌無效
// @Tags auth
// @Accept json
// @Produce json
// @Security Bearer
// @Success 200 {object} interfaces.SuccessResponse "登出成功"
// @Failure 401 {object} interfaces.ErrorResponse "未授權"
// @Router /api/v1/auth/logout [post]
func (h *AuthHandler) UserLogout(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "未提供授權令牌"})
		return
	}

	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "授權格式無效"})
		return
	}

	token := parts[1]
	err := h.authService.Logout(token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "成功登出"})
}

// 驗證令牌
// @Summary 驗證令牌並返回用戶信息
// @Description 驗證當前 JWT 令牌並返回對應的用戶信息
// @Tags auth
// @Accept json
// @Produce json
// @Security Bearer
// @Success 200 {object} UserResponse "用戶信息"
// @Failure 401 {object} ErrorResponse "未授權"
// @Router /api/v1/auth/token [post]
func (h *AuthHandler) ValidateToken(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, ErrorResponse{Error: "未認證"})
		return
	}

	user, err := h.userService.GetUserById(userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "無法獲取用戶信息"})
		return
	}

	c.JSON(http.StatusOK, user)
}
