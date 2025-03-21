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
	docs "github.com/passoncomtw/shoppingcar-services/docs"
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
	merchantHandler *MerchantHandler,
	productHandler *ProductHandler,
	shoppingcarHandler *ShoppingcarHandler,
	orderHandler *OrderHandler,
	authService service.AuthService,
	backendService service.BackendUserService,
	wsHandler *websocketManager.WebSocketHandler,
) *gin.Engine {
	r := gin.Default()
	r.Use(configureCORS())

	// 設置swagger
	docs.SwaggerInfo.BasePath = "/api"
	docs.SwaggerInfo.Title = "Shopping Car API"
	docs.SwaggerInfo.Description = "購物車系統API文檔"
	docs.SwaggerInfo.Version = "1.0"

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
			authorized.GET("/user", userHandler.GetUserInfo)
			authorized.PUT("/user", userHandler.UpdateUserInfo)
			authorized.GET("/merchants", merchantHandler.GetAppMerchants)
			authorized.GET("/merchants/:merchantId/products", productHandler.GetMerchantProducts)
			authorized.GET("/products/:productId", productHandler.GetAppProduct)
			authorized.GET("/shoppingcar", shoppingcarHandler.GetShoppingcar)
			authorized.POST("/shoppingcar/products", shoppingcarHandler.AppendProduct)
			authorized.DELETE("/shoppingcar", shoppingcarHandler.ClearShoppingcar)
			authorized.POST("/orders", orderHandler.CreateOrder)
			authorized.GET("/orders", orderHandler.GetUserOrders)
			authorized.GET("/orders/:orderId", orderHandler.GetOrderDetail)
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
			authorized.GET("/users", userHandler.GetUsers)
			authorized.GET("/users/:userId", userHandler.GetUser)
			authorized.POST("/merchants", merchantHandler.CreateMerchant)
			authorized.PUT("/merchants/:merchantId", merchantHandler.UpdateMerchant)
			authorized.GET("/merchants/:merchantId", merchantHandler.GetMerchant)
			authorized.GET("/merchants", merchantHandler.GetMerchants)
			authorized.GET("/merchants/items", merchantHandler.GetMerchantItems)
			authorized.POST("/products", productHandler.CreateProduct)
			authorized.PUT("/products/:productId", productHandler.UpdateProduct)
			authorized.GET("/products/:productId", productHandler.GetProduct)
			authorized.GET("/products", productHandler.GetProducts)
			authorized.GET("/shoppingcars", shoppingcarHandler.GetShoppingcars)
			authorized.GET("/orders", orderHandler.GetOrders)
			authorized.GET("/orders/:orderId", orderHandler.GetOrder)
			authorized.PUT("/orders/:orderId/payment", orderHandler.UpdateOrderPayment)
		}
	}

	api := r.Group("/api/v1")
	{
		configurePublicRoutes(api, authHandler, userHandler)
		configureAuthenticatedRoutes(api, authHandler, userHandler, authService)
	}

	// Swagger路由
	api.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

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
