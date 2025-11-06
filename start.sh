#!/bin/bash

# ONE MEDI - Quick Start Script
# This script starts all services and opens the routing page

echo "======================================"
echo "🏥 ONE MEDI - Healthcare Platform"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}⚠️  pnpm not found. Installing...${NC}"
    npm install -g pnpm
fi

echo -e "${BLUE}📦 Installing dependencies...${NC}"
pnpm install

echo ""
echo -e "${BLUE}🚀 Starting all services...${NC}"
echo ""

# Start backend
echo -e "${GREEN}▶️  Starting Backend API (Port 8001)...${NC}"
cd apps/backend && npx tsx src/index.ts > /tmp/backend.log 2>&1 &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend apps
echo -e "${GREEN}▶️  Starting Customer App (Port 3000)...${NC}"
cd ../web && npm run dev > /tmp/web.log 2>&1 &
WEB_PID=$!

echo -e "${GREEN}▶️  Starting Admin Dashboard (Port 3001)...${NC}"
cd ../admin && npm run dev > /tmp/admin.log 2>&1 &
ADMIN_PID=$!

echo -e "${GREEN}▶️  Starting Vendor Dashboard (Port 3002)...${NC}"
cd ../vendor && npm run dev > /tmp/vendor.log 2>&1 &
VENDOR_PID=$!

# Wait for services to start
echo ""
echo -e "${YELLOW}⏳ Waiting for services to start...${NC}"
sleep 10

echo ""
echo -e "${GREEN}✅ All services started!${NC}"
echo ""
echo "======================================"
echo "📱 Application URLs"
echo "======================================"
echo ""
echo -e "${BLUE}🌐 Customer App:${NC}      http://localhost:3000"
echo -e "${BLUE}🔐 Admin Dashboard:${NC}   http://localhost:3001"
echo -e "${BLUE}🏪 Vendor Dashboard:${NC}  http://localhost:3002"
echo -e "${BLUE}🔌 Backend API:${NC}       http://localhost:8001/api/v1"
echo ""
echo "======================================"
echo "🎯 Quick Access"
echo "======================================"
echo ""
echo "Opening routing page in browser..."
echo ""

# Open routing page in default browser
if command -v xdg-open &> /dev/null; then
    xdg-open file://$(pwd)/../../index.html
elif command -v open &> /dev/null; then
    open file://$(pwd)/../../index.html
else
    echo "Please open: file://$(pwd)/../../index.html"
fi

echo ""
echo -e "${GREEN}✨ ONE MEDI is ready!${NC}"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for user to stop
wait
