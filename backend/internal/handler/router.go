package handler

import (
	"fmt"
	"net/http"

	"github.com/passoncomtw/shoppingcar-services/internal/config"
	"github.com/passoncomtw/shoppingcar-services/internal/interfaces"
	"github.com/passoncomtw/shoppingcar-services/internal/middleware"
	"github.com/passoncomtw/shoppingcar-services/internal/service"
	"github.com/passoncomtw/shoppingcar-services/pkg/websocketManager"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type SuccessResponse struct {
	Message string `json:"message"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

type UserResponse = interfaces.User

func NewRouter(
	cfg *config.Config,
	authHandler *AuthHandler,
	userHandler *UserHandler,
	authService service.AuthService,
	backendService service.BackendUserService,
	wsHandler *websocketManager.WebSocketHandler,
) *gin.Engine {
	r := gin.Default()
	r.Use(configureCORS())
	r.GET("/api-docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, SuccessResponse{Message: "Service is healthy"})
	})

	r.GET("/ws", wsHandler.HandleConnection)

	// App API
	appv1 := r.Group("/app")
	{
		appv1.POST("/login", authHandler.UserLogin)

		// 需要 App 用戶認證的路由
		authorized := appv1.Group("/")
		authorized.Use(middleware.AppAuthMiddleware(authService))
		{
			authorized.POST("/logout", authHandler.UserLogout)
		}
	}

	// 後台管理 API
	console := r.Group("/console")
	{
		console.POST("/login", authHandler.ConsoleLogin)

		// 需要後台用戶認證的路由
		authorized := console.Group("/")
		authorized.Use(middleware.ConsoleAuthMiddleware(backendService))
		{
			// 此處添加後台特有的路由
		}
	}

	api := r.Group("/api/v1")
	{
		configurePublicRoutes(api, authHandler, userHandler)
		configureAuthenticatedRoutes(api, authHandler, userHandler, authService)
	}

	return r
}

func configureCORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func configurePublicRoutes(api *gin.RouterGroup, authHandler *AuthHandler, userHandler *UserHandler) {
	api.POST("/auth", authHandler.UserLogin)
	api.POST("/users", userHandler.CreateUser)
}

func configureAuthenticatedRoutes(api *gin.RouterGroup, authHandler *AuthHandler, userHandler *UserHandler, authService service.AuthService) {
	authorized := api.Group("/")
	authorized.Use(middleware.AuthMiddleware(authService))

	authorized.POST("/auth/logout", authHandler.UserLogout)
	authorized.POST("/auth/token", authHandler.ValidateToken)
	authorized.GET("/users", userHandler.GetUsers)
}

func StartServer(cfg *config.Config, router *gin.Engine) {
	addr := fmt.Sprintf(":%d", cfg.Server.Port)
	router.Run(addr)
}
