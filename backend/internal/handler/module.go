package handler

import (
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
)
