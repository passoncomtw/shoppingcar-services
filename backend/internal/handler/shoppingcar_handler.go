package handler

import (
	"net/http"
	"strconv"

	"github.com/passoncomtw/shoppingcar-services/internal/interfaces"
	"github.com/passoncomtw/shoppingcar-services/internal/middleware"
	"github.com/passoncomtw/shoppingcar-services/internal/service"

	"github.com/gin-gonic/gin"
)

type ShoppingcarHandler struct {
	shoppingcarService service.ShoppingcarService
}

func NewShoppingcarHandler(shoppingcarService service.ShoppingcarService) *ShoppingcarHandler {
	return &ShoppingcarHandler{
		shoppingcarService: shoppingcarService,
	}
}

// 新增產品到購物車
// @Summary 新增產品到購物車
// @Description 新增產品到購物車
// @Tags AppShoppingcar
// @Accept json
// @Produce json
// @Security Bearer
// @Param data body interfaces.AppAddProductToShoppingcarRequest true "產品信息"
// @Success 200 {object} interfaces.AppShoppingcarInformation "購物車信息"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 401 {object} interfaces.ErrorResponse "未授權"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /app/shoppingcarss/{merchantId}/products/{productId} [post]
func (h *ShoppingcarHandler) AppendProduct(c *gin.Context) {
	// 從URL獲取路徑參數
	merchantIDFromPath := c.Param("merchantId")
	productIDFromPath := c.Param("productId")
	merchantID, _ := strconv.Atoi(merchantIDFromPath)
	productID, _ := strconv.Atoi(productIDFromPath)
	// 從context獲取用戶ID
	userID, exists := c.Get(middleware.UserIDKey)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "未授權"})
		return
	}

	var req interfaces.AppAddProductToShoppingcarRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 這裡沒有商家ID參數，預設為0
	shoppingcar, err := h.shoppingcarService.AppendProduct(userID.(int), merchantID, productID, req.Amount)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, shoppingcar)
}

// 清空購物車
// @Summary 清空購物車
// @Description 清空購物車
// @Tags AppShoppingcar
// @Accept json
// @Produce json
// @Security Bearer
// @Success 200 {object} interfaces.AppShoppingcarResponse "購物車信息"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /app/shoppingcars [delete]
func (h *ShoppingcarHandler) ClearShoppingcar(c *gin.Context) {
	// 從context獲取用戶ID
	userID, exists := c.Get(middleware.UserIDKey)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "未授權"})
		return
	}

	err := h.shoppingcarService.ClearShoppingcar(userID.(int))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 清空後獲取購物車
	shoppingcar, err := h.shoppingcarService.GetShoppingcarByUser(userID.(int))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, shoppingcar)
}

// 獲取購物車
// @Summary 獲取購物車
// @Description 獲取購物車
// @Tags AppShoppingcar
// @Accept json
// @Produce json
// @Security Bearer
// @Success 200 {object} interfaces.AppShoppingcarResponse "購物車信息"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /app/shoppingcars [get]
func (h *ShoppingcarHandler) GetShoppingcar(c *gin.Context) {
	// 從context獲取用戶ID
	userID, exists := c.Get(middleware.UserIDKey)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "未授權"})
		return
	}

	if uid, ok := userID.(uint); ok {
		shoppingcar, err := h.shoppingcarService.GetShoppingcarByUser(int(uid))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, shoppingcar)
	} else {
		// 處理類型不匹配的情況
		c.JSON(http.StatusBadRequest, gin.H{"error": "無效的用戶ID類型"})
		return
	}
}

// 獲取購物車列表（控制台）
// @Summary 獲取購物車列表
// @Description 獲取購物車列表
// @Tags ConsoleShoppingcar
// @Accept json
// @Produce json
// @Security Bearer
// @Param pageSize query int false "每頁數量"
// @Param page query int false "頁碼"
// @Success 200 {object} interfaces.ConsoleShoppingcarsResponse "購物車列表"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /console/shoppingcars [get]
func (h *ShoppingcarHandler) GetShoppingcars(c *gin.Context) {
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))
	page, _ := strconv.Atoi(c.Query("page"))

	// 這裡不需要startCursor和endCursor參數
	response, err := h.shoppingcarService.GetShoppingcars(page, pageSize, "", "")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}

// 添加產品到特定用戶的購物車
// @Summary 添加產品到特定用戶的購物車
// @Description 添加產品到特定用戶的購物車
// @Tags AppShoppingcar
// @Accept json
// @Produce json
// @Security Bearer
// @Param userId path int true "用戶ID"
// @Param productId path int true "產品ID"
// @Param data body interfaces.AddProductToShoppingcarRequest true "產品數量"
// @Success 200 {object} interfaces.AppShoppingcarInformation "購物車信息"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 401 {object} interfaces.ErrorResponse "未授權"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /app/shoppingcars/{userId}/products/{productId} [post]
func (h *ShoppingcarHandler) AddProductToUserShoppingcar(c *gin.Context) {
	// 獲取路徑參數
	userId, err := strconv.Atoi(c.Param("userId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無效的用戶ID"})
		return
	}

	productId, err := strconv.Atoi(c.Param("productId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無效的產品ID"})
		return
	}

	// 綁定請求數據
	var req interfaces.AddProductToShoppingcarRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 調用服務方法添加產品到購物車
	shoppingcar, err := h.shoppingcarService.AppendProduct(userId, 0, productId, req.Amount)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, shoppingcar)
}
