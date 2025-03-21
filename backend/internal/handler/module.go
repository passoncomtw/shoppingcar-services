package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/passoncomtw/shoppingcar-services/internal/config"
	"go.uber.org/fx"
)

// Module provides handlers.
var Module = fx.Options(
	fx.Provide(
		NewAuthHandler,
		NewUserHandler,
		NewMerchantHandler,
		NewProductHandler,
		NewShoppingcarHandler,
		NewOrderHandler,
		NewRouter,
	),
	// 啟動HTTP服務器
	fx.Invoke(func(router *gin.Engine, cfg *config.Config) {
		StartServer(cfg, router)
	}),
)
