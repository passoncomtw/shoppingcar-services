package service

import (
	"errors"
	"fmt"
	"time"

	"github.com/passoncomtw/shoppingcar-services/internal/interfaces"
	"gorm.io/gorm"
)

// 數據庫產品模型
type Product struct {
	ID          int       `gorm:"primaryKey;column:id" json:"id"`
	Name        string    `gorm:"column:name;not null" json:"name"`
	Price       float64   `gorm:"column:price;not null" json:"price"`
	Description string    `gorm:"column:description" json:"description"`
	Subtitle    string    `gorm:"column:subtitle" json:"subtitle"`
	StockAmount int       `gorm:"column:stock_amount;default:0" json:"stock_amount"`
	MerchantID  int       `gorm:"column:merchant_id;not null" json:"merchant_id"`
	CreatedAt   time.Time `gorm:"column:created_at;default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Product) TableName() string {
	return "products"
}

// 將數據庫模型轉換為API模型
func (p *Product) ToAPIModel() interfaces.Product {
	return interfaces.Product{
		ID:          p.ID,
		Name:        p.Name,
		Price:       p.Price,
		StockAmount: p.StockAmount,
		Description: p.Description,
		Subtitle:    p.Subtitle,
		MerchantID:  p.MerchantID,
	}
}

// ProductService 產品服務接口
type ProductService interface {
	CreateProduct(req *interfaces.ConsoleCreateProductRequest) (*interfaces.ProductWithMerchantInfo, error)
	UpdateProduct(id int, req *interfaces.ConsoleUpdateProductRequest) (*interfaces.ProductWithMerchantInfo, error)
	GetProduct(id int, productID int) (*interfaces.ProductWithMerchantInfo, error)
	GetProducts(page, pageSize int) (*interfaces.ConsoleProductsResponse, error)
	GetProductsByMerchant(merchantID, page, pageSize int) (*interfaces.ConsoleProductsResponse, error)
	GetAppProduct(id int, productID int) (*interfaces.AppProduct, error)
	GetProductByMerchant(merchantID int, productID int) (*interfaces.ProductWithMerchantInfo, error)
}

type ProductServiceImpl struct {
	db              *gorm.DB
	merchantService MerchantService
}

func NewProductService(db *gorm.DB, merchantService MerchantService) ProductService {
	return &ProductServiceImpl{
		db:              db,
		merchantService: merchantService,
	}
}

// CreateProduct 創建產品
func (s *ProductServiceImpl) CreateProduct(req *interfaces.ConsoleCreateProductRequest) (*interfaces.ProductWithMerchantInfo, error) {
	// 檢查商家是否存在
	merchant, err := s.merchantService.GetMerchant(req.MerchantID)
	if err != nil {
		return nil, err
	}

	// 創建新產品
	product := &Product{
		Name:        req.Name,
		Price:       req.Price,
		Description: req.Description,
		Subtitle:    req.Subtitle,
		StockAmount: req.StockAmount,
		MerchantID:  req.MerchantID,
	}

	// 保存到數據庫
	if err := s.db.Create(product).Error; err != nil {
		return nil, err
	}

	// 返回包含商家信息的產品詳情
	return &interfaces.ProductWithMerchantInfo{
		ID:          product.ID,
		Name:        product.Name,
		Description: product.Description,
		Price:       product.Price,
		StockAmount: product.StockAmount,
		MerchantID:  product.MerchantID,
		Subtitle:    product.Subtitle,
		Merchant: interfaces.Merchant{
			ID:   merchant.ID,
			Name: merchant.Name,
		},
	}, nil
}

// UpdateProduct 更新產品
func (s *ProductServiceImpl) UpdateProduct(productID int, req *interfaces.ConsoleUpdateProductRequest) (*interfaces.ProductWithMerchantInfo, error) {
	// 檢查商家是否存在
	merchant, err := s.merchantService.GetMerchant(req.MerchantID)
	if err != nil {
		return nil, err
	}

	// 獲取產品
	var product Product
	if err := s.db.First(&product, productID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("產品不存在")
		}
		return nil, err
	}

	// 更新產品信息
	updates := map[string]interface{}{}
	if req.Name != "" {
		updates["name"] = req.Name
	}
	if req.Price > 0 {
		updates["price"] = req.Price
	}
	if req.StockAmount > 0 {
		updates["stock_amount"] = req.StockAmount
	}
	if req.Description != "" {
		updates["description"] = req.Description
	}
	if req.Subtitle != "" {
		updates["subtitle"] = req.Subtitle
	}
	if req.MerchantID > 0 && req.MerchantID != product.MerchantID {
		updates["merchant_id"] = req.MerchantID
	}

	// 保存更新
	if err := s.db.Model(&product).Updates(updates).Error; err != nil {
		return nil, err
	}

	// 重新獲取產品信息以確保有最新數據
	if err := s.db.First(&product, productID).Error; err != nil {
		return nil, err
	}

	// 返回更新後的產品信息
	return &interfaces.ProductWithMerchantInfo{
		ID:          product.ID,
		Name:        product.Name,
		Description: product.Description,
		Price:       product.Price,
		StockAmount: product.StockAmount,
		MerchantID:  product.MerchantID,
		Subtitle:    product.Subtitle,
		Merchant: interfaces.Merchant{
			ID:   merchant.ID,
			Name: merchant.Name,
		},
	}, nil
}

// GetProduct 獲取產品信息
func (s *ProductServiceImpl) GetProduct(merchantID int, productID int) (*interfaces.ProductWithMerchantInfo, error) {
	var product Product
	if err := s.db.First(&product, productID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("產品不存在")
		}
		return nil, err
	}

	// 如果指定了商家ID，確保產品屬於該商家
	if merchantID > 0 && product.MerchantID != merchantID {
		return nil, errors.New("該產品不屬於指定商家")
	}

	// 獲取商家信息
	merchant, err := s.merchantService.GetMerchant(product.MerchantID)
	if err != nil {
		return nil, err
	}

	return &interfaces.ProductWithMerchantInfo{
		ID:          product.ID,
		Name:        product.Name,
		Description: product.Description,
		Price:       product.Price,
		StockAmount: product.StockAmount,
		MerchantID:  product.MerchantID,
		Subtitle:    product.Subtitle,
		Merchant: interfaces.Merchant{
			ID:   merchant.ID,
			Name: merchant.Name,
		},
	}, nil
}

// GetProducts 獲取產品列表
func (s *ProductServiceImpl) GetProducts(page, pageSize int) (*interfaces.ConsoleProductsResponse, error) {
	if page <= 0 {
		page = 1
	}
	if pageSize <= 0 {
		pageSize = 10
	}

	var products []Product
	var totalCount int64

	// 計算總數
	if err := s.db.Model(&Product{}).Count(&totalCount).Error; err != nil {
		return nil, err
	}

	// 分頁查詢
	offset := (page - 1) * pageSize
	if err := s.db.Offset(offset).Limit(pageSize).Find(&products).Error; err != nil {
		return nil, err
	}

	// 轉換為API模型
	items := make([]interfaces.ProductWithMerchantInfo, 0, len(products))
	for _, product := range products {
		merchant, err := s.merchantService.GetMerchant(product.MerchantID)
		if err != nil {
			// 如果獲取商家信息失敗，繼續處理其他產品
			fmt.Printf("獲取商家信息失敗: %v\n", err)
			continue
		}

		items = append(items, interfaces.ProductWithMerchantInfo{
			ID:          product.ID,
			Name:        product.Name,
			Description: product.Description,
			Price:       product.Price,
			StockAmount: product.StockAmount,
			MerchantID:  product.MerchantID,
			Subtitle:    product.Subtitle,
			Merchant: interfaces.Merchant{
				ID:   merchant.ID,
				Name: merchant.Name,
			},
		})
	}

	// 計算總頁數
	totalPages := (int(totalCount) + pageSize - 1) / pageSize

	return &interfaces.ConsoleProductsResponse{
		Items:      items,
		TotalCount: totalCount,
		PageInfo: interfaces.PageInfo{
			HasNextPage:     page < totalPages,
			HasPreviousPage: page > 1,
			StartCursor:     "", // 暫不使用游標
			EndCursor:       "", // 暫不使用游標
		},
	}, nil
}

// GetProductsByMerchant 獲取指定商家的產品列表
func (s *ProductServiceImpl) GetProductsByMerchant(merchantID, page, pageSize int) (*interfaces.ConsoleProductsResponse, error) {

	// 檢查商家是否存在
	merchant, err := s.merchantService.GetMerchant(merchantID)
	if err != nil {
		return nil, err
	}

	if page <= 0 {
		page = 1
	}
	if pageSize <= 0 {
		pageSize = 10
	}

	var products []Product
	var totalCount int64

	// 計算總數
	if err := s.db.Model(&Product{}).Where("merchant_id = ?", merchantID).Count(&totalCount).Error; err != nil {
		return nil, err
	}

	// 分頁查詢
	offset := (page - 1) * pageSize
	if err := s.db.Where("merchant_id = ?", merchantID).Offset(offset).Limit(pageSize).Find(&products).Error; err != nil {
		return nil, err
	}

	// 轉換為API模型
	items := make([]interfaces.ProductWithMerchantInfo, 0, len(products))
	for _, product := range products {

		items = append(items, interfaces.ProductWithMerchantInfo{
			ID:          product.ID,
			Name:        product.Name,
			Description: product.Description,
			Price:       product.Price,
			StockAmount: product.StockAmount,
			MerchantID:  product.MerchantID,
			Subtitle:    product.Subtitle,
			Merchant: interfaces.Merchant{
				ID:   merchant.ID,
				Name: merchant.Name,
			},
		})
	}

	// 計算總頁數
	totalPages := (int(totalCount) + pageSize - 1) / pageSize
	return &interfaces.ConsoleProductsResponse{
		Items:      items,
		TotalCount: totalCount,
		PageInfo: interfaces.PageInfo{
			HasNextPage:     page < totalPages,
			HasPreviousPage: page > 1,
		},
	}, nil
}

// GetAppProduct 獲取App產品詳情
func (s *ProductServiceImpl) GetAppProduct(merchantID int, productID int) (*interfaces.AppProduct, error) {
	product, err := s.GetProduct(merchantID, productID)
	if err != nil {
		return nil, err
	}

	// 將控制台產品轉換為App產品
	return &interfaces.AppProduct{
		ID:           product.ID,
		Name:         product.Name,
		Description:  product.Description,
		Price:        product.Price,
		MerchantID:   product.MerchantID,
		MerchantName: product.Merchant.Name,
		Stock:        product.StockAmount,
	}, nil
}

// GetProductByMerchant 通過商家ID和產品ID獲取產品詳情
func (s *ProductServiceImpl) GetProductByMerchant(merchantID int, productID int) (*interfaces.ProductWithMerchantInfo, error) {
	var product Product
	if err := s.db.Where("id = ? AND merchant_id = ?", productID, merchantID).First(&product).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("該商家沒有此產品")
		}
		return nil, err
	}

	// 獲取商家信息
	merchant, err := s.merchantService.GetMerchant(merchantID)
	if err != nil {
		return nil, err
	}

	return &interfaces.ProductWithMerchantInfo{
		ID:          product.ID,
		Name:        product.Name,
		Description: product.Description,
		Price:       product.Price,
		StockAmount: product.StockAmount,
		MerchantID:  product.MerchantID,
		Subtitle:    product.Subtitle,
		Merchant: interfaces.Merchant{
			ID:   merchant.ID,
			Name: merchant.Name,
		},
	}, nil
}
