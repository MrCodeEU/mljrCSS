.PHONY: install build dev clean test test-unit test-e2e test-watch test-ui test-coverage package release help setup start

# Default target
help:
	@echo "MLJR CSS Framework - Available commands:"
	@echo ""
	@echo "  make setup       - Install dependencies and build (first time setup)"
	@echo "  make start       - Quick start: install, build CSS, and run dev server"
	@echo "  make install     - Install all dependencies"
	@echo "  make build       - Build all packages"
	@echo "  make dev         - Start development server"
	@echo "  make clean       - Remove all build artifacts and node_modules"
	@echo "  make check       - Run type checking"
	@echo "  make test        - Run all tests (unit + e2e + accessibility)"
	@echo "  make test-unit   - Run unit tests only"
	@echo "  make test-watch  - Run tests in watch mode"
	@echo "  make test-ui     - Run tests with interactive UI"
	@echo "  make test-coverage - Run tests with coverage report"
	@echo "  make test-e2e    - Run end-to-end tests"
	@echo "  make package     - Package Svelte components for distribution"
	@echo "  make changeset   - Create a new changeset"
	@echo "  make release     - Build and publish packages"
	@echo ""
	@echo "Package-specific commands:"
	@echo "  make build-css   - Build CSS package only"
	@echo "  make build-svelte - Build Svelte package only"
	@echo "  make dev-svelte  - Start Svelte dev server"
	@echo ""

# Quick start (recommended for first time)
setup: install build
	@echo ""
	@echo "Setup complete! Run 'make dev' to start the development server."

# Quick start with dev server
start: install build-css dev

# Install dependencies
install:
	pnpm install

# Build all packages
build: build-css build-svelte

build-css:
	pnpm --filter mljr-css build

build-svelte:
	pnpm --filter mljr-svelte build

# Development
dev:
	pnpm --filter mljr-svelte dev

dev-svelte:
	pnpm --filter mljr-svelte dev

# Clean build artifacts
clean:
	rm -rf node_modules
	rm -rf packages/mljr-css/node_modules
	rm -rf packages/mljr-css/dist
	rm -rf packages/mljr-svelte/node_modules
	rm -rf packages/mljr-svelte/dist
	rm -rf packages/mljr-svelte/.svelte-kit
	rm -rf .turbo

# Type checking
check:
	pnpm --filter mljr-svelte check

# Testing
test: test-unit test-e2e
	@echo ""
	@echo "All tests completed successfully!"

test-unit:
	@echo "Running unit tests..."
	pnpm --filter mljr-svelte test

test-watch:
	pnpm --filter mljr-svelte test:watch

test-ui:
	pnpm --filter mljr-svelte test:ui

test-coverage:
	@echo "Running tests with coverage..."
	pnpm --filter mljr-svelte test:coverage
	@echo ""
	@echo "Coverage report generated in packages/mljr-svelte/coverage/"

test-e2e:
	@echo "Running end-to-end tests..."
	pnpm --filter mljr-svelte test:e2e

test-e2e-ui:
	pnpm --filter mljr-svelte test:e2e:ui

test-e2e-debug:
	pnpm --filter mljr-svelte test:e2e:debug

# Package for distribution
package:
	pnpm --filter mljr-svelte package

# Changesets
changeset:
	pnpm changeset

# Release
release:
	pnpm build
	pnpm changeset publish

# Watch CSS changes (for development)
watch-css:
	pnpm --filter mljr-css dev
