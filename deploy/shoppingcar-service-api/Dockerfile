# 構建階段
FROM golang:1.23-alpine AS builder

# 設置工作目錄
WORKDIR /app

# 安裝必要的工具
RUN apk add --no-cache git

# 複製 go mod 和 go sum 文件
COPY backend/go.mod backend/go.sum ./

# 下載所有依賴
RUN go mod download

# 複製源代碼
COPY backend/ ./

# 生成 Swagger 文檔
RUN /go/bin/swag init -g cmd/api/main.go -o docs

# 構建應用
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/api

# 最終階段
FROM alpine:latest

# 安裝相關依賴
RUN apk --no-cache add ca-certificates tzdata

# 設置工作目錄
WORKDIR /app

# 從構建階段複製編譯好的應用
COPY --from=builder /app/main .

# 設置環境變量
ENV PORT=3000 \
    GIN_MODE=release

# 暴露端口
EXPOSE 3000

# 運行應用
CMD ["./main"] 