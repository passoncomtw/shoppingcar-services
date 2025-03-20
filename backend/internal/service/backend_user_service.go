package service

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/passoncomtw/shoppingcar-services/internal/config"
	redis "github.com/passoncomtw/shoppingcar-services/pkg/redisManager"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type BackendUser struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Account   string    `gorm:"uniqueIndex" json:"account"`
	Password  string    `json:"-"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (BackendUser) TableName() string {
	return "backend_users"
}

type BackendUserService interface {
	Login(account, password string) (string, BackendUser, error)
	ValidateToken(token string) (uint, error)
}

type backendUserService struct {
	db          *gorm.DB
	config      *config.Config
	redisClient redis.RedisManager
}

func NewBackendUserService(db *gorm.DB, config *config.Config, redisClient redis.RedisManager) BackendUserService {
	return &backendUserService{
		db:          db,
		config:      config,
		redisClient: redisClient,
	}
}

func (s *backendUserService) Login(account, password string) (string, BackendUser, error) {
	var user BackendUser
	if err := s.db.Where("account = ?", account).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return "", BackendUser{}, errors.New("帳號或密碼錯誤")
		}
		return "", BackendUser{}, err
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	fmt.Printf("hashedPassword: %s\n", string(hashedPassword))

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return "", BackendUser{}, errors.New("帳號或密碼錯誤")
	}

	// 生成JWT令牌，加入區分標記
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":  user.ID,
		"iat":  time.Now().Unix(),
		"exp":  time.Now().Add(s.config.JWT.ExpiresIn).Unix(),
		"type": "console", // 標記為控制台用戶
	})

	signedToken, err := token.SignedString([]byte(s.config.JWT.Secret))
	if err != nil {
		return "", BackendUser{}, err
	}

	return signedToken, user, nil
}

func (s *backendUserService) ValidateToken(token string) (uint, error) {
	// 檢查令牌是否在黑名單中
	exists, err := s.redisClient.Exists(context.Background(), "blacklist:"+token)
	if err != nil {
		return 0, err
	}
	if exists {
		return 0, errors.New("令牌已被撤銷")
	}

	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(s.config.JWT.Secret), nil
	})

	if err != nil {
		return 0, err
	}

	// 驗證令牌是否過期
	if exp, ok := claims["exp"].(float64); ok {
		if float64(time.Now().Unix()) > exp {
			return 0, errors.New("令牌已過期")
		}
	}

	// 檢查令牌類型
	if tokenType, ok := claims["type"].(string); ok {
		if tokenType != "console" {
			return 0, errors.New("無效的令牌類型")
		}
	} else {
		return 0, errors.New("令牌缺少類型聲明")
	}

	// 獲取用戶ID
	if sub, ok := claims["sub"].(float64); ok {
		return uint(sub), nil
	}

	return 0, errors.New("無效的令牌聲明")
}
