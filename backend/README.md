# 購物車服務

本專案是一個基於 Golang 的購物車服務，使用 Monorepo 架構組織程式碼。

## 專案結構

```
.
├── .github/                    # GitHub 相關配置
├── .golangci.yml               # Golangci-lint 配置
├── Makefile                    # 全域 Makefile
├── go.mod                      # 主要 Go 模組定義
├── go.sum                      # 相依性校驗檔案
├── cmd/                        # 應用程式入口點
│   ├── api/                    # API 服務入口
│   └── migration/              # 資料庫遷移工具入口
├── internal/                   # 僅供本倉庫使用的程式碼
│   ├── app/                    # 應用邏輯
│   │   └── api/                # API 服務
│   │       ├── handlers/       # HTTP 處理器
│   │       ├── routes/         # 路由定義
│   │       └── services/       # 業務服務
│   ├── auth/                   # 認證相關
│   ├── config/                 # 配置管理
│   ├── db/                     # 資料庫連接和模型
│   └── server/                 # 服務器設定
├── pkg/                        # 可被外部專案匯入的套件
│   ├── core/                   # 核心模組
│   ├── databaseManager/        # 資料庫管理
│   ├── httpClient/             # HTTP 客戶端
│   ├── logger/                 # 日誌套件
│   ├── nacosManager/           # 配置中心管理
│   ├── redisManager/           # Redis 管理
│   ├── utils/                  # 通用工具函數
│   └── websocketManager/       # WebSocket 管理
├── docs/                       # 文檔
│   ├── architecture/           # 架構文檔
│   ├── api/                    # API 文檔
│   └── guides/                 # 開發指南
├── deployments/                # 部署配置
│   ├── docker/                 # Docker 配置
│   └── kubernetes/             # Kubernetes 配置
└── migrations/                 # 資料庫遷移檔案
    └── seeds/                  # 資料填充
```

## 開發環境設置

### 前置需求

- Go 1.21+
- Docker 和 Docker Compose
- PostgreSQL
- Redis

### 安裝步驟

1. 克隆儲存庫
```bash
git clone https://github.com/passoncomtw/shoppingcar-services.git
cd shoppingcar-services
```

2. 安裝依賴
```bash
go mod download
```

3. 啟動開發環境
```bash
docker-compose -f deployments/docker/docker-compose.yml up -d
```

4. 運行遷移
```bash
make migrate-up
```

5. 啟動服務
```bash
make run
```

## 常用命令

```bash
# 構建
make build

# 運行測試
make test

# 執行 lint 檢查
make lint

# 生成 Swagger 文檔
make swagger

# 資料庫遷移
make migrate-up
make migrate-down
```

## API 文檔

啟動服務後，可以通過以下地址訪問 Swagger 文檔：
```
http://localhost:8080/swagger/index.html
```

## 部署

### Docker

```bash
docker build -t shoppingcart-api -f deployments/docker/Dockerfile.api .
docker run -p 8080:8080 shoppingcart-api
```

### Kubernetes

1. 設置配置和密鑰
```bash
kubectl apply -f deployments/kubernetes/common/configmap.yaml
kubectl apply -f deployments/kubernetes/common/secrets.yaml
```

2. 部署服務
```bash
kubectl apply -f deployments/kubernetes/api/
```