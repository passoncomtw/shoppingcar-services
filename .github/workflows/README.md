# GitHub Actions 工作流說明

這個目錄包含用於自動化部署和發布應用程序的GitHub Actions工作流配置。

## deploy-shoppingcar-api-docker.yaml

這個工作流用於自動化構建和部署購物車服務API。

### 功能

1. 當推送代碼到`main`分支，且更改涉及以下路徑時觸發:
   - `backend/**` - 後端代碼
   - `deploy/shoppingcar-service-api/**` - 部署配置
   - `.github/workflows/deploy-shoppingcar-api-docker.yaml` - 工作流本身

2. 也可以手動觸發（通過`workflow_dispatch`）。

3. 執行以下步驟:
   - 檢出代碼
   - 設置QEMU和Docker Buildx（用於多平台構建）
   - 登錄到DockerHub
   - 構建並推送Docker鏡像`passon/shoppingcar-service-api:lastest`
   - 通過SSH連接到生產服務器並部署應用

### 所需的密鑰

需要在GitHub倉庫設置中配置以下密鑰:

- `DOCKERHUB_USERNAME`: DockerHub用戶名
- `DOCKERHUB_TOKEN`: DockerHub訪問令牌
- `SSH_USERNAME`: SSH用戶名
- `SSH_PRIVATE_KEY`: SSH私鑰

### 部署目標

- 服務器: 172.237.27.51
- 部署路徑: `/opt/services/apps/shoppingcar-service/api-service/` 