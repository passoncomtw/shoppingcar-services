package service

import (
	"fmt"
	"time"

	"github.com/passoncomtw/shoppingcar-services/internal/interfaces"
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
}

type DefaultProductService struct {
	merchantService MerchantService
}

func NewProductService(merchantService MerchantService) ProductService {
	return &DefaultProductService{
		merchantService: merchantService,
	}
}

// CreateProduct 創建產品
func (s *DefaultProductService) CreateProduct(req *interfaces.ConsoleCreateProductRequest) (*interfaces.ProductWithMerchantInfo, error) {
	// 模擬創建產品並返回
	merchant, err := s.merchantService.GetMerchant(req.MerchantID)
	if err != nil {
		return nil, err
	}

	fmt.Println("merchant: %v", merchant)

	product := &interfaces.ProductWithMerchantInfo{
		ID:          1,
		Name:        req.Name,
		Description: req.Description,
		Price:       req.Price,
		// Image:        req.Image,
		MerchantID: req.MerchantID,
		// MerchantName: merchant.Name,
		// Stock:        req.Stock,
		// CreatedAt:    "2023-01-01 00:00:00",
		// UpdatedAt:    "2023-01-01 00:00:00",
	}

	return product, nil
}

// UpdateProduct 更新產品
func (s *DefaultProductService) UpdateProduct(id int, req *interfaces.ConsoleUpdateProductRequest) (*interfaces.ProductWithMerchantInfo, error) {
	// 先檢查商家是否存在
	merchant, err := s.merchantService.GetMerchant(req.MerchantID)
	if err != nil {
		return nil, err
	}

	fmt.Println("merchant: %v", merchant)

	// 模擬更新產品並返回
	product := &interfaces.ProductWithMerchantInfo{
		ID:          id,
		Name:        req.Name,
		Description: req.Description,
		Price:       req.Price,
		// Image:        req.Image,
		MerchantID: req.MerchantID,
		// MerchantName: merchant.Name,
		// Stock:        req.Stock,
		// CreatedAt:    "2023-01-01 00:00:00",
		// UpdatedAt:    "2023-01-02 00:00:00",
	}

	return product, nil
}

// GetProduct 獲取產品信息
func (s *DefaultProductService) GetProduct(id int, productID int) (*interfaces.ProductWithMerchantInfo, error) {
	// 模擬獲取產品信息
	return &interfaces.ProductWithMerchantInfo{
		ID:          id,
		Name:        "產品 " + string(rune(id)),
		Description: "這是一個測試產品",
		Price:       99.9,
		// Image:        "https://example.com/image.jpg",
		MerchantID: 1,
		// MerchantName: "測試商家",
		// Stock:        100,
		// CreatedAt:    "2023-01-01 00:00:00",
		// UpdatedAt:    "2023-01-01 00:00:00",
	}, nil
}

func (s *DefaultProductService) GetProducts(page, pageSize int) (*interfaces.ConsoleProductsResponse, error) {
	products := make([]interfaces.ProductWithMerchantInfo, 0)
	for i := 1; i <= 10; i++ {
		products = append(products, interfaces.ProductWithMerchantInfo{
			ID:          i,
			Name:        "產品 " + string(rune(i)),
			Description: "這是一個測試產品",
			Price:       float64(i) * 10,
			// Image:        "https://example.com/image.jpg",
			MerchantID: 1,
			// MerchantName: "測試商家",
			// Stock:        100,
			// CreatedAt:    "2023-01-01 00:00:00",
			// UpdatedAt:    "2023-01-01 00:00:00",
		})
	}

	return &interfaces.ConsoleProductsResponse{
		Items: products,
		PageInfo: interfaces.PageInfo{
			HasNextPage:     page < 5,
			HasPreviousPage: page > 1,
			StartCursor:     "cursor1",
			EndCursor:       "cursor10",
		},
	}, nil
}

func (s *DefaultProductService) GetProductsByMerchant(merchantID, page, pageSize int) (*interfaces.ConsoleProductsResponse, error) {
	// 檢查商家是否存在
	merchant, err := s.merchantService.GetMerchant(merchantID)
	if err != nil {
		return nil, err
	}

	fmt.Printf("merchant: %v", merchant)
	// 模擬獲取指定商家的產品列表
	products := make([]interfaces.ProductWithMerchantInfo, 0)
	for i := 1; i <= 5; i++ {
		products = append(products, interfaces.ProductWithMerchantInfo{
			ID:          i,
			Name:        "產品 " + string(rune(i)),
			Description: "這是一個測試產品",
			Price:       float64(i) * 10,
			// Image:        "https://example.com/image.jpg",
			MerchantID: merchantID,
			// MerchantName: merchant.Name,
			// Stock:        100,
			// CreatedAt:    "2023-01-01 00:00:00",
			// UpdatedAt:    "2023-01-01 00:00:00",
		})
	}

	return &interfaces.ConsoleProductsResponse{
		Items: products,
		PageInfo: interfaces.PageInfo{
			HasNextPage:     page < 3,
			HasPreviousPage: page > 1,
			StartCursor:     "cursor1",
			EndCursor:       "cursor5",
		},
	}, nil
}

// GetAppProduct 獲取App產品詳情
func (s *DefaultProductService) GetAppProduct(id int, productID int) (*interfaces.AppProduct, error) {
	product, err := s.GetProduct(id, productID)
	if err != nil {
		return nil, err
	}

	// 將控制台產品轉換為App產品
	return &interfaces.AppProduct{
		ID:          product.ID,
		Name:        product.Name,
		Description: product.Description,
		Price:       product.Price,
		// Image:        product.Image,
		MerchantID: product.MerchantID,
		// MerchantName: product.MerchantName,
		// Stock:        product.Stock,
	}, nil
}
