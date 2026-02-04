# Variables - Change these to match your project names
FUNCTION_NAME := bootstrap
LAMBDA_DIR := ./lambdas
CDK_DIR := .

.PHONY: build deploy clean help

## build: Compile the Go binary for AWS Lambda (Linux ARM64)
build:
	@echo "Building Go binary..."
	cd $(LAMBDA_DIR) && \
	GOOS=linux GOARCH=arm64 CGO_ENABLED=0 go build -o $(FUNCTION_NAME) main.go
	@echo "Build complete: $(LAMBDA_DIR)/$(FUNCTION_NAME)"

## deploy: Build the binary and then deploy via CDK
deploy: build
	@echo "Starting CDK deployment..."
	cdk deploy --all --require-approval never

## clean: Remove the compiled binary
clean:
	rm -f $(LAMBDA_DIR)/$(FUNCTION_NAME)
	@echo "Cleaned up binaries."

## help: Show this help message
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@sed -n 's/^##//p' $(MAKEFILE_LIST) | column -t -s ':' |  sed -e 's/^/ /'