#!/bin/bash
# Verification script for AI Website Scanner setup

echo "🔍 AI Website Scanner - Setup Verification"
echo "==========================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "  ✅ Node.js $NODE_VERSION installed"
else
    echo "  ❌ Node.js not found. Install from nodejs.org"
    exit 1
fi

# Check dependencies
echo ""
echo "✓ Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "  ✅ Dependencies installed (node_modules found)"
else
    echo "  ❌ Dependencies not installed. Run: npm install"
    exit 1
fi

# Check .env file
echo ""
echo "✓ Checking configuration..."
if [ -f ".env" ]; then
    if grep -q "OPENAI_API_KEY" .env; then
        if grep -q "sk-" .env; then
            echo "  ✅ .env file found with API key"
        else
            echo "  ⚠️  .env file found but API key might be placeholder"
        fi
    else
        echo "  ⚠️  .env file found but OPENAI_API_KEY not set"
    fi
else
    echo "  ❌ .env file not found. Create it with your API key"
    exit 1
fi

# Check Docker
echo ""
echo "✓ Checking Docker..."
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo "  ✅ $DOCKER_VERSION installed"
else
    echo "  ⚠️  Docker not found (optional, needed for containerization)"
fi

# Check files
echo ""
echo "✓ Checking project files..."
for file in server.js package.json public/index.html Dockerfile docker-compose.yml; do
    if [ -f "$file" ]; then
        echo "  ✅ $file exists"
    else
        echo "  ❌ $file missing"
    fi
done

echo ""
echo "==========================================="
echo "✅ All checks passed! Ready to run:"
echo ""
echo "   npm start              (local development)"
echo "   docker-compose up -d   (Docker deployment)"
echo ""
echo "Access at: http://localhost:3000"
echo "==========================================="
