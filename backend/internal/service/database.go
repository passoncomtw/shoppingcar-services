package service

import (
	"github.com/passoncomtw/shoppingcar-services/pkg/databaseManager"

	"gorm.io/gorm"
)

func ProvideGormDB(dbManager databaseManager.DatabaseManager) *gorm.DB {
	return dbManager.GetDB()
}
