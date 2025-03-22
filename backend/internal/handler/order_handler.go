package handler

import (
	"net/http"
	"strconv"

	"github.com/passoncomtw/shoppingcar-services/internal/interfaces"
	"github.com/passoncomtw/shoppingcar-services/internal/middleware"
	"github.com/passoncomtw/shoppingcar-services/internal/service"

	"github.com/gin-gonic/gin"
)

type OrderHandler struct {
	orderService       service.OrderService
	shoppingcarService service.ShoppingcarService
}

func NewOrderHandler(orderService service.OrderService, shoppingcarService service.ShoppingcarService) *OrderHandler {
	return &OrderHandler{
		orderService:       orderService,
		shoppingcarService: shoppingcarService,
	}
}

// 創建訂單
// @Summary 創建訂單
// @Description 從購物車創建訂單
// @Tags AppOrders
// @Accept json
// @Produce json
// @Security Bearer
// @Success 200 {object} interfaces.AppOrdersResponse "訂單列表"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /app/orders [post]
func (h *OrderHandler) CreateOrder(c *gin.Context) {
	// 從context獲取用戶ID
	userID, exists := c.Get(middleware.UserIDKey)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "未授權"})
		return
	}

	orders, err := h.orderService.CreateOrderFromShoppingcar(userID.(int))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, interfaces.AppOrdersResponse{
		Items: orders,
	})
}

// 獲取訂單列表
// @Summary 獲取訂單列表
// @Description 獲取當前用戶的訂單列表
// @Tags AppOrders
// @Accept json
// @Produce json
// @Security Bearer
// @Param pageSize query int false "每頁數量"
// @Param page query int false "頁碼"
// @Success 200 {object} interfaces.AppOrdersResponse "訂單列表"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /app/orders [get]
func (h *OrderHandler) GetUserOrders(c *gin.Context) {
	// 從context獲取用戶ID
	userID, exists := c.Get(middleware.UserIDKey)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "未授權"})
		return
	}

	pageSize, _ := strconv.Atoi(c.Query("pageSize"))
	page, _ := strconv.Atoi(c.Query("page"))

	orders, err := h.orderService.GetOrdersByUser(userID.(int), page, pageSize)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, orders)
}

// 獲取訂單詳情
// @Summary 獲取訂單詳情
// @Description 獲取訂單詳情
// @Tags AppOrders
// @Accept json
// @Produce json
// @Security Bearer
// @Param orderId path int true "訂單ID"
// @Success 200 {object} interfaces.AppOrderResponse "訂單詳情"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 404 {object} interfaces.ErrorResponse "訂單不存在"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /app/orders/{orderId} [get]
func (h *OrderHandler) GetOrderDetail(c *gin.Context) {
	// 從context獲取用戶ID
	userID, exists := c.Get(middleware.UserIDKey)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "未授權"})
		return
	}

	orderID, err := strconv.Atoi(c.Param("orderId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無效的訂單ID"})
		return
	}

	order, err := h.orderService.GetOrderInformation(orderID, userID.(int))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, interfaces.AppOrderResponse{
		Item: *order,
	})
}

// 獲取訂單列表（控制台）
// @Summary 獲取訂單列表
// @Description 獲取訂單列表
// @Tags ConsoleOrders
// @Accept json
// @Produce json
// @Security Bearer
// @Param pageSize query int false "每頁數量"
// @Param page query int false "頁碼"
// @Success 200 {object} interfaces.ConsoleOrdersResponse "訂單列表"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /console/orders [get]
func (h *OrderHandler) GetOrders(c *gin.Context) {
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))
	page, _ := strconv.Atoi(c.Query("page"))

	response, err := h.orderService.GetOrders(page, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}

// 獲取訂單詳情（控制台）
// @Summary 獲取訂單詳情
// @Description 獲取訂單詳情
// @Tags ConsoleOrders
// @Accept json
// @Produce json
// @Security Bearer
// @Param orderId path int true "訂單ID"
// @Success 200 {object} interfaces.ConsoleOrderResponse "訂單詳情"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 404 {object} interfaces.ErrorResponse "訂單不存在"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /console/orders/{orderId} [get]
func (h *OrderHandler) GetOrder(c *gin.Context) {
	orderID, err := strconv.Atoi(c.Param("orderId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無效的訂單ID"})
		return
	}

	order, err := h.orderService.GetOrder(orderID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, interfaces.ConsoleOrderResponse{
		Item: *order,
	})
}

// 更新訂單支付狀態
// @Summary 更新訂單支付狀態
// @Description 更新訂單支付狀態
// @Tags ConsoleOrders
// @Accept json
// @Produce json
// @Security Bearer
// @Param orderId path int true "訂單ID"
// @Param data body interfaces.ConsoleUpdateOrderPaymentRequest true "支付狀態"
// @Success 200 {object} interfaces.ConsoleOrderResponse "訂單詳情"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 404 {object} interfaces.ErrorResponse "訂單不存在"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /console/orders/{orderId}/payment [put]
func (h *OrderHandler) UpdateOrderPayment(c *gin.Context) {
	orderID, err := strconv.Atoi(c.Param("orderId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無效的訂單ID"})
		return
	}

	var req interfaces.ConsoleUpdateOrderPaymentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	order, err := h.orderService.UpdateOrderPayment(orderID, req.IsPaid)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, interfaces.ConsoleOrderResponse{
		Item: *order,
	})
}
