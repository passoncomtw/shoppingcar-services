package handler

import (
	"net/http"
	"strconv"

	"github.com/passoncomtw/shoppingcar-services/internal/interfaces"
	"github.com/passoncomtw/shoppingcar-services/internal/service"

	"github.com/gin-gonic/gin"
)

type MerchantHandler struct {
	merchantService service.MerchantService
}

func NewMerchantHandler(merchantService service.MerchantService) *MerchantHandler {
	return &MerchantHandler{
		merchantService: merchantService,
	}
}

// 創建商家
// @Summary 創建商家
// @Description 創建新商家
// @Tags ConsoleMerchant
// @Accept json
// @Produce json
// @Param data body interfaces.ConsoleCreateMerchantRequest true "商家信息"
// @Success 200 {object} interfaces.ConsoleMerchantResponse "創建成功"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /console/merchants [post]
func (h *MerchantHandler) CreateMerchant(c *gin.Context) {
	var req interfaces.ConsoleCreateMerchantRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	merchant, err := h.merchantService.CreateMerchant(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, interfaces.ConsoleMerchantResponse{
		Item: *merchant,
	})
}

// 更新商家
// @Summary 更新商家
// @Description 更新商家信息
// @Tags ConsoleMerchant
// @Accept json
// @Produce json
// @Param merchantId path int true "商家ID"
// @Param data body interfaces.ConsoleUpdateMerchantRequest true "商家信息"
// @Success 200 {object} interfaces.ConsoleMerchantResponse "更新成功"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 404 {object} interfaces.ErrorResponse "商家不存在"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /console/merchants/{merchantId} [put]
func (h *MerchantHandler) UpdateMerchant(c *gin.Context) {
	merchantID, err := strconv.Atoi(c.Param("merchantId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無效的商家ID"})
		return
	}

	var req interfaces.ConsoleUpdateMerchantRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	merchant, err := h.merchantService.UpdateMerchant(merchantID, &req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, interfaces.ConsoleMerchantResponse{
		Item: *merchant,
	})
}

// 獲取商家
// @Summary 獲取商家
// @Description 獲取商家信息
// @Tags ConsoleMerchant
// @Accept json
// @Produce json
// @Param merchantId path int true "商家ID"
// @Success 200 {object} interfaces.ConsoleMerchantResponse "商家信息"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 404 {object} interfaces.ErrorResponse "商家不存在"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /console/merchants/{merchantId} [get]
func (h *MerchantHandler) GetMerchant(c *gin.Context) {
	merchantID, err := strconv.Atoi(c.Param("merchantId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無效的商家ID"})
		return
	}

	merchant, err := h.merchantService.GetMerchant(merchantID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, interfaces.ConsoleMerchantResponse{
		Item: *merchant,
	})
}

// 獲取商家列表
// @Summary 獲取商家列表
// @Description 獲取商家列表
// @Tags ConsoleMerchant
// @Accept json
// @Produce json
// @Param pageSize query int false "每頁數量"
// @Param startCursor query string false "起始游標"
// @Param endCursor query string false "結束游標"
// @Success 200 {object} interfaces.ConsoleMerchantsResponse "商家列表"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /console/merchants [get]
func (h *MerchantHandler) GetMerchants(c *gin.Context) {
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))
	page, _ := strconv.Atoi(c.Query("page"))

	response, err := h.merchantService.GetMerchants(page, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}

// 獲取商家項目列表
// @Summary 獲取商家項目列表（不分頁）
// @Description 獲取所有商家的簡單列表，用於商品選擇
// @Tags ConsoleMerchant
// @Accept json
// @Produce json
// @Success 200 {object} interfaces.ConsoleMerchantItemsResponse "商家項目列表"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /console/merchants/items [get]
func (h *MerchantHandler) GetMerchantItems(c *gin.Context) {
	response, err := h.merchantService.GetMerchantItems()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}

// App獲取商家列表
// @Summary App獲取商家列表
// @Description App獲取商家列表
// @Tags AppMerchants
// @Accept json
// @Produce json
// @Param pageSize query int false "每頁數量"
// @Param endCursor query string false "結束游標"
// @Success 200 {object} interfaces.AppMerchantsResponse "商家列表"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /app/merchants [get]
func (h *MerchantHandler) GetAppMerchants(c *gin.Context) {
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))
	page, _ := strconv.Atoi(c.Query("page"))

	response, err := h.merchantService.GetAppMerchants(page, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}
