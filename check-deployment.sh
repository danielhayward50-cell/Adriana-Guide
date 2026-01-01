#!/bin/bash

# Adriana Guide - Pre-Deployment Check Script
# This script checks if your project is ready for deployment

echo "🚀 Adriana Guide - Deployment Readiness Check"
echo "=============================================="
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi
echo "✅ npm is installed"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules not found. Installing dependencies..."
    npm install
else
    echo "✅ node_modules exists"
fi

# Check if .env.example exists
if [ ! -f ".env.example" ]; then
    echo "❌ .env.example not found"
    exit 1
fi
echo "✅ .env.example exists"

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
    echo "❌ vercel.json not found"
    exit 1
fi
echo "✅ vercel.json exists"

# Check if package.json has required scripts
if ! grep -q '"build"' package.json; then
    echo "❌ build script not found in package.json"
    exit 1
fi
echo "✅ build script exists"

# Try to build the project
echo ""
echo "🔨 Testing build..."
if npm run build > /tmp/build.log 2>&1; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Check /tmp/build.log for details"
    cat /tmp/build.log
    exit 1
fi

# Check if dist folder was created
if [ ! -d "dist" ]; then
    echo "❌ dist folder not created after build"
    exit 1
fi
echo "✅ dist folder created"

# All checks passed
echo ""
echo "=============================================="
echo "✅ All checks passed! Your project is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub"
echo "2. Go to https://vercel.com"
echo "3. Import your repository"
echo "4. Click Deploy!"
echo ""
echo "Or use the one-click deploy button:"
echo "https://vercel.com/new/clone?repository-url=https://github.com/danielhayward50-cell/Adriana-Guide"
echo ""
