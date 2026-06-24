@echo off
REM Verification script for AI Website Scanner setup (Windows)

echo.
echo 🔍 AI Website Scanner - Setup Verification
echo ===========================================
echo.

REM Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo   ✅ Node.js !NODE_VERSION! installed
) else (
    echo   ❌ Node.js not found. Install from nodejs.org
    exit /b 1
)

REM Check dependencies
echo.
echo Checking dependencies...
if exist "node_modules" (
    echo   ✅ Dependencies installed
) else (
    echo   ❌ Dependencies not installed. Run: npm install
    exit /b 1
)

REM Check .env file
echo.
echo Checking configuration...
if exist ".env" (
    findstr /M "OPENAI_API_KEY" .env >nul
    if !errorlevel! equ 0 (
        findstr /M "sk-" .env >nul
        if !errorlevel! equ 0 (
            echo   ✅ .env file found with API key
        ) else (
            echo   ⚠️  .env file found but API key might be placeholder
        )
    ) else (
        echo   ⚠️  .env file found but OPENAI_API_KEY not set
    )
) else (
    echo   ❌ .env file not found. Create it with your API key
    exit /b 1
)

REM Check Docker
echo.
echo Checking Docker...
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('docker --version') do set DOCKER_VERSION=%%i
    echo   ✅ !DOCKER_VERSION! installed
) else (
    echo   ⚠️  Docker not found (optional, needed for containerization)
)

REM Check files
echo.
echo Checking project files...
for %%F in (server.js package.json public\index.html Dockerfile docker-compose.yml) do (
    if exist "%%F" (
        echo   ✅ %%F exists
    ) else (
        echo   ❌ %%F missing
    )
)

echo.
echo ===========================================
echo ✅ All checks passed! Ready to run:
echo.
echo    npm start              (local development)
echo    docker-compose up -d   (Docker deployment)
echo.
echo Access at: http://localhost:3000
echo ===========================================
echo.
pause
