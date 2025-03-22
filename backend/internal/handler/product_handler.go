package handler

import (
	"net/http"
	"strconv"

	"github.com/passoncomtw/shoppingcar-services/internal/interfaces"
	"github.com/passoncomtw/shoppingcar-services/internal/service"

	"github.com/gin-gonic/gin"
)

type ProductHandler struct {
	productService service.ProductService
}

func NewProductHandler(productService service.ProductService) *ProductHandler {
	return &ProductHandler{
		productService: productService,
	}
}

// 創建產品
// @Summary 創建產品
// @Description 創建新產品
// @Tags ConsoleProduct
// @Accept json
// @Produce json
// @Security Bearer
// @Param data body interfaces.ConsoleCreateProductRequest true "產品信息"
// @Success 200 {object} interfaces.ConsoleProductResponse "創建成功"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /console/products [post]
func (h *ProductHandler) CreateProduct(c *gin.Context) {
	var req interfaces.ConsoleCreateProductRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	product, err := h.productService.CreateProduct(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, interfaces.ConsoleProductResponse{
		Item: *product,
	})
}

// 更新產品
// @Summary 更新產品
// @Description 更新產品信息
// @Tags ConsoleProduct
// @Accept json
// @Produce json
// @Security Bearer
// @Param productId path int true "產品ID"
// @Param data body interfaces.ConsoleUpdateProductRequest true "產品信息"
// @Success 200 {object} interfaces.ConsoleProductResponse "更新成功"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 404 {object} interfaces.ErrorResponse "產品不存在"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /console/products/{productId} [put]
func (h *ProductHandler) UpdateProduct(c *gin.Context) {
	productID, err := strconv.Atoi(c.Param("productId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無效的產品ID"})
		return
	}

	var req interfaces.ConsoleUpdateProductRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	product, err := h.productService.UpdateProduct(productID, &req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, interfaces.ConsoleProductResponse{
		Item: *product,
	})
}

// GetProduct 獲取商品詳情
func (h *ProductHandler) GetProduct(c *gin.Context) {
	productID, err := strconv.Atoi(c.Param("productId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無效的商品ID"})
		return
	}

	product, err := h.productService.GetProduct(productID, 0) // 商家ID為0表示不限制商家
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, interfaces.ConsoleProductResponse{
		Item: *product,
	})
}

// GetProducts 獲取商品列表
func (h *ProductHandler) GetProducts(c *gin.Context) {
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))
	page, _ := strconv.Atoi(c.Query("page"))
	merchantID, _ := strconv.Atoi(c.Query("merchantId"))

	var response *interfaces.ConsoleProductsResponse
	var err error

	if merchantID > 0 {
		response, err = h.productService.GetProductsByMerchant(merchantID, page, pageSize)
	} else {
		response, err = h.productService.GetProducts(page, pageSize)
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}

// GetMerchantProducts 獲取指定商家的商品列表（App端）
func (h *ProductHandler) GetMerchantProducts(c *gin.Context) {
	merchantID, err := strconv.Atoi(c.Param("merchantId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無效的商家ID"})
		return
	}

	pageSize, _ := strconv.Atoi(c.Query("pageSize"))
	page, _ := strconv.Atoi(c.Query("page"))

	products, err := h.productService.GetProductsByMerchant(merchantID, page, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 轉換為APP端產品列表
	appProducts := make([]interfaces.AppProductInformation, 0)
	for _, product := range products.Items {
		appProduct, err := h.productService.GetAppProduct(product.ID, merchantID)
		if err != nil {
			continue // 跳過錯誤的產品
		}

		appProducts = append(appProducts, interfaces.AppProductInformation{
			ID:          appProduct.ID,
			Name:        appProduct.Name,
			Price:       appProduct.Price,
			StockAmount: appProduct.Stock,
			Description: appProduct.Description,
			Subtitle:    "", // 產品無Subtitle字段
		})
	}

	c.JSON(http.StatusOK, interfaces.AppProductsResponse{
		Items: appProducts,
		PageInfo: interfaces.PageInfo{
			HasNextPage:     products.PageInfo.HasNextPage,
			HasPreviousPage: products.PageInfo.HasPreviousPage,
			StartCursor:     products.PageInfo.StartCursor,
			EndCursor:       products.PageInfo.EndCursor,
		},
	})
}

// GetAppProduct 獲取App商品詳情
func (h *ProductHandler) GetAppProduct(c *gin.Context) {
	productID, err := strconv.Atoi(c.Param("productId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無效的商品ID"})
		return
	}

	product, err := h.productService.GetAppProduct(productID, 0) // 商家ID為0表示不限制商家
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, interfaces.AppProductResponse{
		Item: interfaces.AppProductInformation{
			ID:          product.ID,
			Name:        product.Name,
			Price:       product.Price,
			StockAmount: product.Stock,
			Description: product.Description,
			Subtitle:    "", // 產品無Subtitle字段
		},
	})
}
