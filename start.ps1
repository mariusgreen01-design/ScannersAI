#!/usr/bin/env pwsh
# Start AI Website Scanner - Run this script to launch the application

Write-Host "🤖 AI Website Scanner" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "❌ Dependencies not installed!" -ForegroundColor Red
    Write-Host "Run: npm install" -ForegroundColor Yellow
    exit 1
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
    Write-Host "Create .env with your OpenAI API key" -ForegroundColor Yellow
    exit 1
}

# Check if API key is set
$env_content = Get-Content ".env" | Select-String "sk-"
if (-not $env_content) {
    Write-Host "⚠️  OpenAI API key not configured!" -ForegroundColor Yellow
    Write-Host "Edit .env and add your key" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Environment ready" -ForegroundColor Green
Write-Host ""
Write-Host "Starting server..." -ForegroundColor Cyan
Write-Host ""

# Start the server
node server.js
