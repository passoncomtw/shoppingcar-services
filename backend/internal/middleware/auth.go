package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/passoncomtw/shoppingcar-services/internal/service"
)

const (
	// UserIDKey 是存儲在上下文中的用戶ID的鍵
	UserIDKey = "userID"
	// ConsoleUserIDKey 是存儲在上下文中的控制台用戶ID的鍵
	ConsoleUserIDKey = "consoleUserID"
)

// AuthMiddleware 是認證中間件
func AuthMiddleware(authService service.AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		// 兼容原有中間件，實際使用 AppAuthMiddleware
		AppAuthMiddleware(authService)(c)
	}
}

// AppAuthMiddleware 是應用用戶認證中間件
func AppAuthMiddleware(authService service.AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "未提供授權令牌"})
			c.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "授權格式無效"})
			c.Abort()
			return
		}

		token := parts[1]
		userID, err := authService.ValidateToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}

		c.Set(UserIDKey, userID)
		c.Next()
	}
}

// ConsoleAuthMiddleware 是控制台用戶認證中間件
func ConsoleAuthMiddleware(backendService service.BackendUserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "未提供授權令牌"})
			c.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "授權格式無效"})
			c.Abort()
			return
		}

		token := parts[1]
		userID, err := backendService.ValidateToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}

		// 將uint類型的userID轉換為int並保存到上下文
		c.Set(ConsoleUserIDKey, int(userID))
		c.Next()
	}
}
