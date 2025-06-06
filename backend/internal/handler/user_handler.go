package handler

import (
	"net/http"
	"strconv"

	"github.com/passoncomtw/shoppingcar-services/internal/service"

	"github.com/gin-gonic/gin"
	"github.com/passoncomtw/shoppingcar-services/internal/interfaces"
	"github.com/passoncomtw/shoppingcar-services/internal/middleware"
)

type UserHandler struct {
	userService service.UserService
}

func NewUserHandler(userService service.UserService) *UserHandler {
	return &UserHandler{
		userService: userService,
	}
}

// 創建用戶
// @Summary 創建新用戶
// @Description 使用提供的信息創建新用戶
// @Tags users
// @Accept json
// @Produce json
// @Param data body service.CreateUserParams true "用戶信息"
// @Success 201 {object} interfaces.CreateUserResponse "創建成功"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /api/v1/users [post]
func (h *UserHandler) CreateUser(c *gin.Context) {
	var params service.CreateUserParams
	if err := c.ShouldBindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.userService.CreateUser(&params)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, user)
}

// 獲取用戶列表
// @Summary 獲取所有用戶
// @Description 返回系統中的所有用戶
// @Tags ConsoleUser
// @Accept json
// @Produce json
// @Security Bearer
// @Param page query int false "頁碼，默認為1" example:"1"
// @Param page_size query int false "每頁記錄數，默認為10" example:"10"
// @Success 200 {object} interfaces.ConsoleGetUserResponse "用戶列表"
// @Failure 401 {object} interfaces.ErrorResponse "未授權"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /console/users [get]
func (h *UserHandler) GetUsers(c *gin.Context) {
	// 從查詢參數中獲取分頁信息
	pageStr := c.DefaultQuery("page", "1")
	pageSizeStr := c.DefaultQuery("page_size", "10")

	page, err := strconv.Atoi(pageStr)
	if err != nil || page <= 0 {
		page = 1
	}

	pageSize, err := strconv.Atoi(pageSizeStr)
	if err != nil || pageSize <= 0 {
		pageSize = 10
	}

	// 調用服務層獲取分頁數據
	response, err := h.userService.GetUsers(page, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 將 User 列表轉換為 ConsoleUserInformation 列表
	var items []interfaces.ConsoleUserInformation
	for _, user := range response.Users {
		items = append(items, interfaces.ConsoleUserInformation{
			ID:    user.ID,
			Name:  user.Name,
			Phone: user.Phone,
		})
	}

	// 創建控制台響應格式
	consoleResponse := interfaces.ConsoleGetUserResponse{
		Items:      items,
		TotalCount: response.Pagination.Total,
		PageInfo: interfaces.PageInfo{
			HasNextPage:     response.Pagination.HasNext,
			HasPreviousPage: response.Pagination.HasPrevious,
			StartCursor:     "", // 這個項目中暫時不使用游標
			EndCursor:       "", // 這個項目中暫時不使用游標
		},
	}

	c.JSON(http.StatusOK, consoleResponse)
}

// GetUserInfo 獲取當前用戶信息
// @Summary 獲取當前用戶信息
// @Description 獲取當前登錄用戶的詳細信息
// @Tags AppUser
// @Accept json
// @Produce json
// @Security Bearer
// @Success 200 {object} interfaces.AppUserInformation "用戶信息"
// @Failure 401 {object} interfaces.ErrorResponse "未授權"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /app/users [get]
func (h *UserHandler) GetUserInfo(c *gin.Context) {
	// 從context獲取用戶ID
	userID, exists := c.Get(middleware.UserIDKey)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "未授權"})
		return
	}

	user, err := h.userService.GetUserById(uint(userID.(int)))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, interfaces.AppUserInformation{
		ID:        int(user.ID),
		Name:      user.Name,
		Phone:     user.Phone,
		CreatedAt: "2023-01-01 00:00:00", // 模擬創建時間
	})
}

// UpdateUserInfo 更新當前用戶信息
// @Summary 更新當前用戶信息
// @Description 更新當前登錄用戶的信息
// @Tags AppUser
// @Accept json
// @Produce json
// @Security Bearer
// @Param data body interfaces.ConsoleUpdateUserRequest true "用戶信息"
// @Success 200 {object} interfaces.AppUserInformation "用戶信息"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 401 {object} interfaces.ErrorResponse "未授權"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /app/users [put]
func (h *UserHandler) UpdateUserInfo(c *gin.Context) {
	// 從context獲取用戶ID
	userID, exists := c.Get(middleware.UserIDKey)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "未授權"})
		return
	}

	var req interfaces.ConsoleUpdateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 這裡簡化處理，僅返回修改後的模擬數據
	c.JSON(http.StatusOK, interfaces.AppUserInformation{
		ID:        userID.(int),
		Name:      req.Name,
		Phone:     req.Phone,
		CreatedAt: "2023-01-01 00:00:00", // 模擬創建時間
	})
}

// GetUser 獲取指定用戶信息（控制台）
// @Summary 獲取指定用戶信息
// @Description 獲取指定用戶的詳細信息
// @Tags ConsoleUser
// @Accept json
// @Produce json
// @Security Bearer
// @Param userId path int true "用戶ID"
// @Success 200 {object} interfaces.ConsoleUserResponse "用戶信息"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 404 {object} interfaces.ErrorResponse "用戶不存在"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /console/users/{userId} [get]
func (h *UserHandler) GetUser(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("userId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無效的用戶ID"})
		return
	}

	user, err := h.userService.GetUserById(uint(userID))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "用戶不存在"})
		return
	}

	c.JSON(http.StatusOK, interfaces.ConsoleUserResponse{
		Item: interfaces.ConsoleUserInformation{
			ID:    int(user.ID),
			Name:  user.Name,
			Phone: user.Phone,
		},
	})
}

// CreateConsoleUser 從後台創建用戶
// @Summary 從後台創建新用戶
// @Description 管理員從後台系統創建新用戶
// @Tags ConsoleUser
// @Accept json
// @Produce json
// @Security Bearer
// @Param data body interfaces.ConsoleCreateUserRequest true "用戶信息"
// @Success 201 {object} interfaces.ConsoleUserResponse "創建成功"
// @Failure 400 {object} interfaces.ErrorResponse "請求錯誤"
// @Failure 401 {object} interfaces.ErrorResponse "未授權"
// @Failure 500 {object} interfaces.ErrorResponse "服務器錯誤"
// @Router /console/users [post]
func (h *UserHandler) CreateConsoleUser(c *gin.Context) {
	var req interfaces.ConsoleCreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 創建用戶參數
	params := &service.CreateUserParams{
		Password: req.Password,
		Phone:    req.Phone,
	}

	// 調用服務層創建用戶
	user, err := h.userService.CreateUser(params)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 如果需要，更新用戶名
	if req.Name != "" {
		updateReq := &interfaces.ConsoleUpdateUserRequest{
			Name: req.Name,
		}
		user, err = h.userService.UpdateUser(uint(user.ID), updateReq)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}

	// 返回創建的用戶信息
	c.JSON(http.StatusCreated, interfaces.ConsoleUserResponse{
		Item: interfaces.ConsoleUserInformation{
			ID:    user.ID,
			Name:  user.Name,
			Phone: user.Phone,
		},
	})
}
