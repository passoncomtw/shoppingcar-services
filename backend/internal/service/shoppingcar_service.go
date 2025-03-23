package service

import (
	"errors"
	"time"

	"github.com/passoncomtw/shoppingcar-services/internal/config"
	"github.com/passoncomtw/shoppingcar-services/internal/interfaces"

	"gorm.io/gorm"
)

// 數據庫購物車模型
type Shoppingcar struct {
	ID           int       `gorm:"primaryKey;column:id" json:"id"`
	UserID       int       `gorm:"column:user_id;not null" json:"user_id"`
	ProductCount int       `gorm:"column:product_count;not null" json:"product_count"`
	TotalAmount  float64   `gorm:"column:total_amount;default:0" json:"total_amount"`
	CreatedAt    time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt    time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Shoppingcar) TableName() string {
	return "shoppingcars"
}

// 數據庫購物車項目模型
type ShoppingcarItem struct {
	ID            int       `gorm:"primaryKey;column:id" json:"id"`
	ProductID     int       `gorm:"column:product_id;not null" json:"product_id"`
	MerchantID    int       `gorm:"column:merchant_id;not null" json:"merchant_id"`
	ShoppingcarID int       `gorm:"column:shoppingcar_id;not null" json:"shoppingcar_id"`
	Amount        int       `gorm:"column:amount;not null" json:"amount"`
	CreatedAt     time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt     time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (ShoppingcarItem) TableName() string {
	return "shoppingcar_items"
}

// 購物車服務接口
type ShoppingcarService interface {
	GetShoppingcarByUser(userID int) (*interfaces.AppShoppingcarInformation, error)
	AppendProduct(userID, merchantID, productID int, amount int) (*interfaces.AppShoppingcarInformation, error)
	GetShoppingcars(page, pageSize int, startCursor, endCursor string) (*interfaces.ConsoleShoppingcarsResponse, error)
	ClearShoppingcar(userID int) error
	GetShoppingcarItemsByIds(itemIDs []int) ([]ShoppingcarItem, error)
}

// 購物車服務實現
type shoppingcarService struct {
	db              *gorm.DB
	config          *config.Config
	userService     UserService
	productService  ProductService
	merchantService MerchantService
}

// 創建購物車服務實例
func NewShoppingcarService(
	db *gorm.DB,
	config *config.Config,
	userService UserService,
	productService ProductService,
	merchantService MerchantService,
) ShoppingcarService {
	return &shoppingcarService{
		db:              db,
		config:          config,
		userService:     userService,
		productService:  productService,
		merchantService: merchantService,
	}
}

// 獲取用戶購物車信息
func (s *shoppingcarService) GetShoppingcarByUser(userID int) (*interfaces.AppShoppingcarInformation, error) {
	user, err := s.userService.GetUserById(uint(userID))
	if err != nil {
		return nil, err
	}
	// 檢查用戶是否有購物車，如果沒有則創建
	var shoppingcar Shoppingcar
	if err := s.db.Where("user_id = ?", userID).First(&shoppingcar).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// 創建新的購物車
			shoppingcar = Shoppingcar{
				UserID:       userID,
				ProductCount: 0,
				TotalAmount:  0,
			}
			if err := s.db.Create(&shoppingcar).Error; err != nil {
				return nil, err
			}
		}
		// else {
		// 	return nil, err
		// }
	}
	// 獲取購物車項目
	var shoppingcarItems []ShoppingcarItem
	if err := s.db.Where("shoppingcar_id = ?", shoppingcar.ID).Find(&shoppingcarItems).Error; err != nil {
		return nil, err
	}

	// 構建API模型
	apiShoppingcarItems := make([]interfaces.ShoppingcarItem, 0, len(shoppingcarItems))
	for _, item := range shoppingcarItems {
		// 獲取產品信息
		// product, err := s.productService.GetAppProduct(item.MerchantID, item.ProductID)
		// if err != nil {
		// 	continue // 如果獲取產品信息失敗，跳過該項目
		// }

		// // 獲取商家信息
		// merchant, err := s.merchantService.GetMerchant(item.MerchantID)
		// if err != nil {
		// 	continue // 如果獲取商家信息失敗，跳過該項目
		// }

		apiShoppingcarItems = append(apiShoppingcarItems, interfaces.ShoppingcarItem{
			ID:     item.ID,
			Amount: item.Amount,
			// Product: *product,
			// Merchant: interfaces.AppMerchantInformation{
			// 	ID:    merchant.ID,
			// 	Name:  merchant.Name,
			// 	Phone: merchant.Phone,
			// 	Email: merchant.Email,
			// },
		})
	}

	// 更新購物車總數和總額
	productCount := 0
	totalAmount := 0.0
	for _, item := range apiShoppingcarItems {
		productCount += item.Amount
		// totalAmount += float64(item.Amount) * item.Product.Price
		totalAmount += 0
	}

	// 如果有變化，更新數據庫
	if productCount != shoppingcar.ProductCount || totalAmount != shoppingcar.TotalAmount {
		s.db.Model(&shoppingcar).Updates(map[string]interface{}{
			"product_count": productCount,
			"total_amount":  totalAmount,
		})
		shoppingcar.ProductCount = productCount
		shoppingcar.TotalAmount = totalAmount
	}

	return &interfaces.AppShoppingcarInformation{
		ID:               shoppingcar.ID,
		ProductCount:     shoppingcar.ProductCount,
		TotalAmount:      shoppingcar.TotalAmount,
		User:             *user,
		ShoppingcarItems: apiShoppingcarItems,
	}, nil
}

// AppendProduct 添加產品到購物車，使用事務確保數據一致性
func (s *shoppingcarService) AppendProduct(userID, merchantID, productID int, amount int) (*interfaces.AppShoppingcarInformation, error) {
	// 使用事務確保操作的原子性
	tx := s.db.Begin()
	if tx.Error != nil {
		return nil, tx.Error
	}

	// 確保事務最終會提交或回滾
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// 驗證商家和產品是否存在，並檢查庫存
	var product Product
	if err := tx.Where("id = ?", productID).First(&product).Error; err != nil {
		tx.Rollback()
		return nil, errors.New("產品不存在")
	}

	// 檢查產品庫存是否足夠
	if product.StockAmount < amount {
		tx.Rollback()
		return nil, errors.New("產品庫存不足")
	}

	// 獲取或創建購物車
	var shoppingcar Shoppingcar
	if err := tx.Where("user_id = ?", userID).First(&shoppingcar).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// 創建新的購物車
			shoppingcar = Shoppingcar{
				UserID:       userID,
				ProductCount: 0,
				TotalAmount:  0,
			}
			if err := tx.Create(&shoppingcar).Error; err != nil {
				tx.Rollback()
				return nil, err
			}
		} else {
			tx.Rollback()
			return nil, err
		}
	}

	// 更新購物車項目
	var existingItem ShoppingcarItem
	var totalAmount float64 = 0
	var productCount int = 0

	// 檢查購物車中是否已有該產品
	if err := tx.Where("shoppingcar_id = ? AND product_id = ?", shoppingcar.ID, productID).First(&existingItem).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// 創建新的購物車項目
			newItem := ShoppingcarItem{
				ProductID:     productID,
				MerchantID:    product.MerchantID, // 使用從數據庫獲取的商家ID
				ShoppingcarID: shoppingcar.ID,
				Amount:        amount,
			}
			if err := tx.Create(&newItem).Error; err != nil {
				tx.Rollback()
				return nil, err
			}
		} else {
			tx.Rollback()
			return nil, err
		}
	} else {
		// 更新現有項目的數量
		newAmount := existingItem.Amount + amount
		if err := tx.Model(&existingItem).Update("amount", newAmount).Error; err != nil {
			tx.Rollback()
			return nil, err
		}
	}

	// 計算購物車的總數量和總價
	var items []ShoppingcarItem
	if err := tx.Where("shoppingcar_id = ?", shoppingcar.ID).Find(&items).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// 更新總數量和總價
	for _, item := range items {
		var itemProduct Product
		if err := tx.Where("id = ?", item.ProductID).First(&itemProduct).Error; err != nil {
			continue // 如果找不到產品，忽略此項目
		}
		totalAmount += float64(item.Amount) * itemProduct.Price
		productCount += item.Amount
	}

	// 更新購物車總額和產品數量
	if err := tx.Model(&shoppingcar).Updates(map[string]interface{}{
		"product_count": productCount,
		"total_amount":  totalAmount,
	}).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// 減少產品庫存
	if err := tx.Model(&product).Update("stock_amount", product.StockAmount-amount).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// 提交事務
	if err := tx.Commit().Error; err != nil {
		return nil, err
	}

	// 獲取更新後的購物車信息
	return s.GetShoppingcarByUser(userID)
}

// 獲取購物車列表（控制台用）
func (s *shoppingcarService) GetShoppingcars(page, pageSize int, startCursor, endCursor string) (*interfaces.ConsoleShoppingcarsResponse, error) {
	if page <= 0 {
		page = 1
	}
	if pageSize <= 0 || pageSize > 100 {
		pageSize = 10
	}

	var shoppingcars []Shoppingcar
	var totalCount int64

	// 計算總數
	if err := s.db.Model(&Shoppingcar{}).Count(&totalCount).Error; err != nil {
		return nil, err
	}

	// 設置查詢條件
	query := s.db.Model(&Shoppingcar{})

	// 如果提供了endCursor，從該位置開始查詢
	if endCursor != "" {
		var lastID int
		// 這裡需要從endCursor中解碼得到lastID
		if err := query.Where("id > ?", lastID).Order("id ASC").Limit(pageSize).Find(&shoppingcars).Error; err != nil {
			return nil, err
		}
	} else if startCursor != "" {
		var firstID int
		// 從startCursor中解碼得到firstID
		if err := query.Where("id < ?", firstID).Order("id DESC").Limit(pageSize).Find(&shoppingcars).Error; err != nil {
			return nil, err
		}
		// 反轉結果以保持一致的順序
		for i, j := 0, len(shoppingcars)-1; i < j; i, j = i+1, j-1 {
			shoppingcars[i], shoppingcars[j] = shoppingcars[j], shoppingcars[i]
		}
	} else {
		// 計算偏移量
		offset := (page - 1) * pageSize
		if err := query.Offset(offset).Limit(pageSize).Find(&shoppingcars).Error; err != nil {
			return nil, err
		}
	}

	// 轉換為API模型
	apiShoppingcars := make([]interfaces.ConsoleShoppingcarItem, 0, len(shoppingcars))
	for _, car := range shoppingcars {
		// 獲取用戶信息
		user, err := s.userService.GetUserById(uint(car.UserID))
		if err != nil {
			continue
		}

		apiShoppingcars = append(apiShoppingcars, interfaces.ConsoleShoppingcarItem{
			ID:           car.ID,
			ProductCount: car.ProductCount,
			TotalAmount:  car.TotalAmount,
			User: interfaces.ConsoleUserInformation{
				ID:    user.ID,
				Name:  user.Name,
				Phone: user.Phone,
			},
		})
	}

	// 構建分頁信息
	hasNextPage := len(shoppingcars) == pageSize && int64((page)*pageSize) < totalCount
	hasPreviousPage := page > 1

	var startCursorValue, endCursorValue string
	if len(shoppingcars) > 0 {
		startCursorValue = "cursor-start-placeholder"
		endCursorValue = "cursor-end-placeholder"
	}

	return &interfaces.ConsoleShoppingcarsResponse{
		Items: apiShoppingcars,
		PageInfo: interfaces.PageInfo{
			HasNextPage:     hasNextPage,
			HasPreviousPage: hasPreviousPage,
			StartCursor:     startCursorValue,
			EndCursor:       endCursorValue,
		},
	}, nil
}

// 清空購物車
func (s *shoppingcarService) ClearShoppingcar(userID int) error {
	// 查找用戶購物車
	var shoppingcar Shoppingcar
	if err := s.db.Where("user_id = ?", userID).First(&shoppingcar).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil // 如果購物車不存在，視為已清空
		}
		return err
	}

	// 開始交易
	tx := s.db.Begin()

	// 刪除購物車項目
	if err := tx.Where("shoppingcar_id = ?", shoppingcar.ID).Delete(&ShoppingcarItem{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 更新購物車總數和總額
	if err := tx.Model(&shoppingcar).Updates(map[string]interface{}{
		"product_count": 0,
		"total_amount":  0,
	}).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 提交交易
	return tx.Commit().Error
}

// 根據ID獲取購物車項目
func (s *shoppingcarService) GetShoppingcarItemsByIds(itemIDs []int) ([]ShoppingcarItem, error) {
	var items []ShoppingcarItem
	if err := s.db.Where("id IN ?", itemIDs).Find(&items).Error; err != nil {
		return nil, err
	}
	return items, nil
}
