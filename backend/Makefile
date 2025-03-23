.PHONY: build test lint run migrate swagger air

build:
	go build -o bin/ ./cmd/...

test:
	go test -race ./...

lint:
	golangci-lint run

run:
	go run ./cmd/api/main.go

swagger:
	swag init -g cmd/api/main.go -o docs

migrate-up:
	go run ./cmd/migration/main.go up

migrate-down:
	go run ./cmd/migration/main.go down

air:
	air
