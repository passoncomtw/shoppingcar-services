package service

import (
	"go.uber.org/fx"
)

// Module provides services.
var Module = fx.Options(
	fx.Provide(
		ProvideGormDB,
		NewAuthService,
		fx.Annotate(
			NewBackendUserService,
			fx.As(new(BackendUserService)),
		),
		fx.Annotate(
			NewUserService,
			fx.As(new(UserService)),
		),
		fx.Annotate(
			NewMerchantService,
			fx.As(new(MerchantService)),
		),
		fx.Annotate(
			NewProductService,
			fx.As(new(ProductService)),
		),
		fx.Annotate(
			NewShoppingcarService,
			fx.As(new(ShoppingcarService)),
		),
		fx.Annotate(
			NewOrderService,
			fx.As(new(OrderService)),
		),
	),
)
