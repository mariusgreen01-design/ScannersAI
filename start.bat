@echo off
REM Start AI Website Scanner - Run this to launch the application

echo.
echo 🤖 AI Website Scanner
echo ==================================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo ❌ Dependencies not installed!
    echo Run: npm install
    exit /b 1
)

REM Check if .env exists
if not exist ".env" (
    echo ⚠️  .env file not found!
    echo Create .env with your OpenAI API key
    exit /b 1
)

REM Check if API key is set
findstr /M "sk-" .env >nul
if errorlevel 1 (
    echo ⚠️  OpenAI API key not configured!
    echo Edit .env and add your key
    exit /b 1
)

echo ✅ Environment ready
echo.
echo Starting server...
echo.

REM Start the server
node server.js

pause
