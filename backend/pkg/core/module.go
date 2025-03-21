package core

import (
	"context"
	"log"

	"github.com/passoncomtw/shoppingcar-services/internal/config"
	"github.com/passoncomtw/shoppingcar-services/internal/service"
	"github.com/passoncomtw/shoppingcar-services/pkg/databaseManager"
	"github.com/passoncomtw/shoppingcar-services/pkg/logger"
	"github.com/passoncomtw/shoppingcar-services/pkg/nacosManager"
	redis "github.com/passoncomtw/shoppingcar-services/pkg/redisManager"
	"github.com/passoncomtw/shoppingcar-services/pkg/websocketManager"

	"go.uber.org/fx"
)

// DatabaseModule 數據庫模組
var DatabaseModule = fx.Options(
	fx.Provide(
		// 基於 Config 轉換為 PostgresConfig
		fx.Annotate(
			func(cfg *config.Config) *databaseManager.PostgresConfig {
				return &databaseManager.PostgresConfig{
					Host:     cfg.Database.Host,
					Port:     cfg.Database.Port,
					User:     cfg.Database.User,
					Password: cfg.Database.Password,
					Name:     cfg.Database.Name,
				}
			},
			fx.ResultTags(`name:"postgresConfig"`),
		),
		// 提供 DatabaseManager 實例
		fx.Annotate(
			func(lc fx.Lifecycle, config *databaseManager.PostgresConfig) (databaseManager.DatabaseManager, error) {
				return databaseManager.ProvideDatabaseManager(lc, config)
			},
			fx.ParamTags(``, `name:"postgresConfig"`),
		),
	),
)

// RedisModule Redis 模組
var RedisModule = fx.Options(
	fx.Provide(
		// 提供 Redis 配置
		func(cfg *config.Config) *redis.RedisConfig {
			return &redis.RedisConfig{
				Addr:     cfg.Redis.Addr,
				Username: cfg.Redis.Username,
				Password: cfg.Redis.Password,
				DB:       cfg.Redis.DB,
			}
		},
		// 提供 Redis 客戶端和管理器
		redis.ProvideRedisClient,
		redis.ProvideRedisManager,
	),
)

// WebSocketModule WebSocket 模組
var WebSocketModule = fx.Options(
	fx.Provide(
		// 提供 WebSocket 管理器
		func(authService service.AuthService) *websocketManager.Manager {
			return websocketManager.NewManager(authService.ValidateToken)
		},
		// 提供 WebSocket 處理程序
		websocketManager.NewWebSocketHandler,
	),
	// 啟動 WebSocket 管理器
	fx.Invoke(
		func(lc fx.Lifecycle, manager *websocketManager.Manager) {
			// 使用背景上下文而不是從生命週期鉤子獲取的上下文
			var ctx context.Context
			var cancel context.CancelFunc

			lc.Append(fx.Hook{
				OnStart: func(startCtx context.Context) error {
					// 創建獨立的背景上下文，不受生命週期鉤子上下文影響
					ctx, cancel = context.WithCancel(context.Background())
					go manager.Start(ctx)
					log.Println("WebSocket Manager: Started with independent context")
					return nil
				},
				OnStop: func(stopCtx context.Context) error {
					// 關閉管理器並取消上下文
					log.Println("WebSocket Manager: Stopping gracefully")
					manager.Shutdown()
					if cancel != nil {
						cancel()
					}
					return nil
				},
			})
		},
	),
)

var LoggerModule = fx.Provide(logger.NewLogger)

var Module = fx.Options(
	nacosManager.Module,
	DatabaseModule,
	RedisModule,
	WebSocketModule,
	LoggerModule,
)
