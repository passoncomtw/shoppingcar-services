# 購物車服務 API 部署

此目錄包含用於部署購物車服務 API 的 Docker 和 Docker Compose 配置文件。

## 文件說明

- `Dockerfile`：用於構建 Go 應用程序的多階段 Dockerfile
- `docker-compose.yaml`：用於配置和運行服務的 Docker Compose 文件
- `.env`：包含服務運行所需的環境變量

## 部署步驟

### 1. 構建映像

```bash
$ docker build -t passon/shoppingcar-service-api:lastest . --platform linux/amd64,linux/arm64 -f ./deploy/shoppingcar-service-api/Dockerfile
```

### 2. 啟動服務

```bash
docker-compose up -d
```

### 3. 檢查服務狀態

```bash
docker-compose ps
```

### 4. 查看日誌

```bash
docker-compose logs -f
```

### 5. 停止服務

```bash
docker-compose down
```

## 端口說明

- 內部端口：3000
- 對外端口：9040

## 環境變量

服務使用 `.env` 文件中的環境變量，這些變量將在啟動時被載入。

## 健康檢查

服務包含健康檢查配置，每 30 秒對 `/health` 端點進行一次檢查。

## 自動重啟

如果服務崩潰，容器將自動重啟（`restart: always` 策略）。 