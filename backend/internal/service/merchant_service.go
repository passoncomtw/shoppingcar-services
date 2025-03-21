package service

import (
	"errors"
	"time"

	"github.com/passoncomtw/shoppingcar-services/internal/config"
	"github.com/passoncomtw/shoppingcar-services/internal/interfaces"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var (
	// ErrMerchantNotFound 商家不存在
	ErrMerchantNotFound = errors.New("商家不存在")
)

// 數據庫商家模型
type Merchant struct {
	ID        int       `gorm:"primaryKey;column:id" json:"id"`
	Name      string    `gorm:"column:name;not null" json:"name"`
	Password  string    `gorm:"column:password;not null" json:"-"`
	Phone     string    `gorm:"column:phone;not null;uniqueIndex" json:"phone"`
	Email     string    `gorm:"column:email;not null;uniqueIndex" json:"email"`
	CreatedAt time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Merchant) TableName() string {
	return "merchants"
}

// 將數據庫模型轉換為API模型
func (m *Merchant) ToAPIModel() interfaces.Merchant {
	return interfaces.Merchant{
		ID:        m.ID,
		Name:      m.Name,
		Phone:     m.Phone,
		Email:     m.Email,
		CreatedAt: m.CreatedAt.Format(time.RFC3339),
		UpdatedAt: m.UpdatedAt.Format(time.RFC3339),
	}
}

// MerchantService 商家服務接口
type MerchantService interface {
	// 創建商家
	CreateMerchant(req *interfaces.ConsoleCreateMerchantRequest) (*interfaces.Merchant, error)
	// 更新商家
	UpdateMerchant(id int, req *interfaces.ConsoleUpdateMerchantRequest) (*interfaces.Merchant, error)
	// 獲取商家
	GetMerchant(id int) (*interfaces.Merchant, error)
	// 獲取商家列表
	GetMerchants(page, pageSize int) (*interfaces.ConsoleMerchantsResponse, error)
	// 獲取商家簡略列表（用於產品選擇）
	GetMerchantItems() (*interfaces.ConsoleMerchantItemsResponse, error)
	// 獲取App商家列表
	GetAppMerchants(page, pageSize int) (*interfaces.AppMerchantsResponse, error)
}

// DefaultMerchantService 商家服務實現
type DefaultMerchantService struct {
	db     *gorm.DB
	config *config.Config
}

// NewMerchantService 創建新的商家服務
func NewMerchantService(db *gorm.DB, config *config.Config) MerchantService {
	return &DefaultMerchantService{
		db:     db,
		config: config,
	}
}

// CreateMerchant 創建商家
func (s *DefaultMerchantService) CreateMerchant(req *interfaces.ConsoleCreateMerchantRequest) (*interfaces.Merchant, error) {
	// 檢查電話號碼是否已存在
	var existingMerchant Merchant
	if err := s.db.Where("phone = ?", req.Phone).First(&existingMerchant).Error; err == nil {
		return nil, errors.New("手機號碼已存在")
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	// 檢查電子郵件是否已存在
	if err := s.db.Where("email = ?", req.Email).First(&existingMerchant).Error; err == nil {
		return nil, errors.New("電子郵件已存在")
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	// 加密密碼
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	// 創建商家
	merchant := &Merchant{
		Name:     req.Name,
		Password: string(hashedPassword),
		Phone:    req.Phone,
		Email:    req.Email,
	}

	if err := s.db.Create(merchant).Error; err != nil {
		return nil, err
	}

	// 轉換為API模型
	apiMerchant := merchant.ToAPIModel()
	return &apiMerchant, nil
}

// UpdateMerchant 更新商家
func (s *DefaultMerchantService) UpdateMerchant(id int, req *interfaces.ConsoleUpdateMerchantRequest) (*interfaces.Merchant, error) {
	var merchant Merchant
	if err := s.db.First(&merchant, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrMerchantNotFound
		}
		return nil, err
	}

	// 準備更新數據
	updates := make(map[string]interface{})

	if req.Name != "" {
		updates["name"] = req.Name
	}

	if req.Phone != "" && req.Phone != merchant.Phone {
		// 檢查新電話號碼是否已被使用
		var count int64
		if err := s.db.Model(&Merchant{}).Where("phone = ? AND id != ?", req.Phone, id).Count(&count).Error; err != nil {
			return nil, err
		}
		if count > 0 {
			return nil, errors.New("該手機號碼已被其他商家使用")
		}
		updates["phone"] = req.Phone
	}

	if req.Email != "" && req.Email != merchant.Email {
		// 檢查新電子郵件是否已被使用
		var count int64
		if err := s.db.Model(&Merchant{}).Where("email = ? AND id != ?", req.Email, id).Count(&count).Error; err != nil {
			return nil, err
		}
		if count > 0 {
			return nil, errors.New("該電子郵件已被其他商家使用")
		}
		updates["email"] = req.Email
	}

	if req.Password != "" {
		// 加密新密碼
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			return nil, err
		}
		updates["password"] = string(hashedPassword)
	}

	// 執行更新
	if len(updates) > 0 {
		if err := s.db.Model(&merchant).Updates(updates).Error; err != nil {
			return nil, err
		}

		// 重新獲取更新後的商家信息
		if err := s.db.First(&merchant, id).Error; err != nil {
			return nil, err
		}
	}

	// 轉換為API模型
	apiMerchant := merchant.ToAPIModel()
	return &apiMerchant, nil
}

// GetMerchant 獲取商家
func (s *DefaultMerchantService) GetMerchant(id int) (*interfaces.Merchant, error) {
	var merchant Merchant
	if err := s.db.First(&merchant, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrMerchantNotFound
		}
		return nil, err
	}

	apiMerchant := merchant.ToAPIModel()
	return &apiMerchant, nil
}

// GetMerchants 獲取商家列表
func (s *DefaultMerchantService) GetMerchants(page, pageSize int) (*interfaces.ConsoleMerchantsResponse, error) {
	if page <= 0 {
		page = 1
	}
	if pageSize <= 0 || pageSize > 100 {
		pageSize = 10
	}

	var merchants []Merchant
	var totalCount int64

	// 計算總數
	if err := s.db.Model(&Merchant{}).Count(&totalCount).Error; err != nil {
		return nil, err
	}

	// 設置查詢條件
	query := s.db.Model(&Merchant{})

	// 計算偏移量
	offset := (page - 1) * pageSize
	if err := query.Offset(offset).Limit(pageSize).Find(&merchants).Error; err != nil {
		return nil, err
	}

	// 轉換為API模型
	apiMerchants := make([]interfaces.Merchant, len(merchants))
	for i, merchant := range merchants {
		apiMerchants[i] = merchant.ToAPIModel()
	}

	// 構建分頁信息
	hasNextPage := len(merchants) == pageSize && int64((page)*pageSize) < totalCount
	hasPreviousPage := page > 1

	var startCursorValue, endCursorValue string
	if len(merchants) > 0 {
		startCursorValue = "cursor-start-placeholder"
		endCursorValue = "cursor-end-placeholder"
	}

	return &interfaces.ConsoleMerchantsResponse{
		Items:      apiMerchants,
		TotalCount: totalCount,
		PageInfo: interfaces.PageInfo{
			HasNextPage:     hasNextPage,
			HasPreviousPage: hasPreviousPage,
			StartCursor:     startCursorValue,
			EndCursor:       endCursorValue,
		},
	}, nil
}

// GetMerchantItems 獲取商家簡略列表（用於產品選擇）
func (s *DefaultMerchantService) GetMerchantItems() (*interfaces.ConsoleMerchantItemsResponse, error) {
	var merchants []Merchant
	if err := s.db.Find(&merchants).Error; err != nil {
		return nil, err
	}

	// 轉換為API模型
	apiMerchants := make([]interfaces.Merchant, len(merchants))
	for i, merchant := range merchants {
		apiMerchants[i] = merchant.ToAPIModel()
	}

	return &interfaces.ConsoleMerchantItemsResponse{
		Items: apiMerchants,
	}, nil
}

// GetAppMerchants 獲取App商家列表
func (s *DefaultMerchantService) GetAppMerchants(page, pageSize int) (*interfaces.AppMerchantsResponse, error) {
	if page <= 0 {
		page = 1
	}
	if pageSize <= 0 || pageSize > 100 {
		pageSize = 10
	}

	var merchants []Merchant
	var totalCount int64

	// 計算總數
	if err := s.db.Model(&Merchant{}).Count(&totalCount).Error; err != nil {
		return nil, err
	}

	// 設置查詢條件
	query := s.db.Model(&Merchant{})

	// 計算偏移量
	offset := (page - 1) * pageSize
	if err := query.Offset(offset).Limit(pageSize).Find(&merchants).Error; err != nil {
		return nil, err
	}

	// 轉換為API模型
	apiMerchants := make([]interfaces.AppMerchantInformation, len(merchants))
	for i, merchant := range merchants {
		apiMerchants[i] = interfaces.AppMerchantInformation{
			ID:    merchant.ID,
			Name:  merchant.Name,
			Phone: merchant.Phone,
			Email: merchant.Email,
		}
	}

	// 構建分頁信息
	hasNextPage := len(merchants) == pageSize && int64((page)*pageSize) < totalCount
	hasPreviousPage := page > 1

	var startCursorValue, endCursorValue string
	if len(merchants) > 0 {
		startCursorValue = "cursor-start-placeholder"
		endCursorValue = "cursor-end-placeholder"
	}

	return &interfaces.AppMerchantsResponse{
		Items:      apiMerchants,
		TotalCount: totalCount,
		PageInfo: interfaces.PageInfo{
			HasNextPage:     hasNextPage,
			HasPreviousPage: hasPreviousPage,
			StartCursor:     startCursorValue,
			EndCursor:       endCursorValue,
		},
	}, nil
}
