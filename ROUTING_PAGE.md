# 🎯 ONE MEDI - Platform Router

This is the main routing page for the ONE MEDI healthcare platform. It provides easy access to all applications in the platform.

## 🌐 Applications

### 1. Customer Web Application
**URL:** http://localhost:3000  
**Description:** Customer-facing e-commerce platform for browsing and purchasing healthcare products and services.

**Features:**
- Browse medicines and lab tests
- Shopping cart
- Checkout with payment
- User authentication
- Order tracking
- 12 healthcare service modules

**Quick Access:** Click "Customer App" button or press `Alt+1`

---

### 2. Admin Dashboard
**URL:** http://localhost:3001  
**Description:** Administrative control panel for managing the entire platform.

**Features:**
- Product catalog management
- Order management
- User administration
- Analytics and reports
- Lab test management
- System settings

**Quick Access:** Click "Admin Dashboard" button or press `Alt+2`

---

### 3. Vendor Dashboard
**URL:** http://localhost:3002  
**Description:** Vendor management portal for product sellers and service providers.

**Features:**
- Product listing management
- Order fulfillment
- Inventory tracking
- Revenue analytics
- Stock alerts

**Quick Access:** Click "Vendor Dashboard" button or press `Alt+3`

---

### 4. Backend API
**URL:** http://localhost:8001/api/v1  
**Health Check:** http://localhost:8001/api/v1/health

**Features:**
- 23+ RESTful API endpoints
- Products, Lab Tests, Orders, Bookings, Payment APIs
- Mock data system

**Quick Access:** Press `Alt+4` for health check

---

## 🚀 Quick Start

### Method 1: Use the Start Script

```bash
cd /app
./start.sh
```

This will:
1. Install dependencies
2. Start all 4 services
3. Open the routing page in your browser

### Method 2: Manual Start

```bash
# Terminal 1: Backend
cd /app/apps/backend
npx tsx src/index.ts

# Terminal 2: Customer App
cd /app/apps/web
npm run dev

# Terminal 3: Admin
cd /app/apps/admin
npm run dev

# Terminal 4: Vendor
cd /app/apps/vendor
npm run dev

# Then open: file:///app/index.html in browser
```

### Method 3: Use Turborepo

```bash
cd /app
pnpm dev

# Then open: file:///app/index.html in browser
```

---

## ⌨️ Keyboard Shortcuts

When the routing page is open:

- `Alt + 1` - Open Customer App (Port 3000)
- `Alt + 2` - Open Admin Dashboard (Port 3001)
- `Alt + 3` - Open Vendor Dashboard (Port 3002)
- `Alt + 4` - Open API Health Check (Port 8001)

---

## 📱 Mobile Access

If running on a network-accessible server, replace `localhost` with your server IP:

- Customer: `http://<your-ip>:3000`
- Admin: `http://<your-ip>:3001`
- Vendor: `http://<your-ip>:3002`
- API: `http://<your-ip>:8001`

---

## 🎨 Routing Page Features

- **Clean Design:** Modern gradient background
- **Responsive:** Works on all devices
- **Hover Effects:** Smooth animations
- **Direct Links:** One-click access to all apps
- **Status Indicators:** Visual confirmation
- **Keyboard Shortcuts:** Fast navigation
- **Feature Overview:** Quick platform summary

---

## 📖 Documentation

For detailed information, see:

- **PROJECT_SUMMARY.md** - Complete platform guide (1,700+ lines)
- **ARCHITECTURE.md** - System architecture (2,500+ lines)
- **ENV_SETUP.md** - Environment setup (1,100+ lines)
- **README.md** - Quick start guide

---

## 🔧 Troubleshooting

**If apps don't open:**

1. Check if services are running:
   ```bash
   curl http://localhost:3000  # Customer app
   curl http://localhost:3001  # Admin
   curl http://localhost:3002  # Vendor
   curl http://localhost:8001/api/v1/health  # API
   ```

2. Check logs:
   ```bash
   tail -f /tmp/backend.log
   tail -f /tmp/web.log
   tail -f /tmp/admin.log
   tail -f /tmp/vendor.log
   ```

3. Restart services:
   ```bash
   pkill -f "next dev"
   pkill -f "tsx"
   ./start.sh
   ```

---

**Created by:** ONE MEDI Development Team  
**Version:** 1.0.0  
**Status:** Production Ready ✅
