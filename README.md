# 🏥 ONE MEDI - Healthcare E-Commerce Platform

> **Enterprise-Grade Healthcare Platform**  
> Turborepo Monorepo | Next.js 15 | Express.js | Supabase | PostgreSQL | MongoDB

**Version:** 1.0.0 (MVP - Production Ready)  
**Build Status:** ✅ All Phases Completed  
**Last Updated:** November 4, 2025

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Setup environment
cp apps/backend/.env.example apps/backend/.env
cp apps/web/.env.example apps/web/.env.local

# 3. Start all services
pnpm dev

# Access applications:
# Customer App:  http://localhost:3000
# Admin Panel:   http://localhost:3001
# Vendor Panel:  http://localhost:3002
# API Server:    http://localhost:8001
```

---

## 📱 Live Application URLs

### Customer-Facing Application
**URL:** http://localhost:3000

**Key Pages:**
- Home: http://localhost:3000
- Medicines: http://localhost:3000/medicines
- Lab Tests: http://localhost:3000/lab-tests
- Shopping Cart: http://localhost:3000/cart
- Checkout: http://localhost:3000/checkout
- Profile: http://localhost:3000/profile
- Orders: http://localhost:3000/orders

### Admin Dashboard
**URL:** http://localhost:3001

**Admin Routes:**
- Dashboard: http://localhost:3001/dashboard
- Products: http://localhost:3001/products
- Orders: http://localhost:3001/orders
- Users: http://localhost:3001/users
- Lab Tests: http://localhost:3001/lab-tests
- Analytics: http://localhost:3001/analytics
- Settings: http://localhost:3001/settings

### Vendor Dashboard
**URL:** http://localhost:3002

**Vendor Routes:**
- Dashboard: http://localhost:3002/dashboard
- My Products: http://localhost:3002/products
- Orders: http://localhost:3002/orders
- Inventory: http://localhost:3002/inventory
- Revenue: http://localhost:3002/revenue

### Backend API
**Base URL:** http://localhost:8001/api/v1

**API Endpoints:**
- Health Check: http://localhost:8001/api/v1/health
- Products: http://localhost:8001/api/v1/products
- Lab Tests: http://localhost:8001/api/v1/lab-tests
- Orders: http://localhost:8001/api/v1/orders

---

## 🎯 Project Vision

ONE MEDI aims to become India's most trusted and comprehensive healthcare platform, providing seamless access to all medical services through a single unified interface.

### Key Objectives
- **Accessibility:** Healthcare services for every Indian, regardless of location
- **Affordability:** Competitive pricing with transparent cost breakdowns
- **Quality:** 100% genuine products and certified healthcare partners
- **Convenience:** One-stop solution for all healthcare needs
- **Trust:** Build trust through transparency, quality, and excellent service

---

## ✅ Completed Features

### Phase 0: Infrastructure ✅
- Turborepo monorepo setup
- 3 Next.js 15 applications
- Express.js backend
- 7 shared packages
- Complete development environment

### Phase 1: Core Backend ✅
- 20+ RESTful API endpoints
- Product CRUD operations
- Lab Test management
- Order processing
- Mock data system

### Phase 2: Customer Experience ✅
- Fully responsive design (mobile → desktop)
- Shopping cart with persistence
- Product browsing & search
- 12 healthcare service modules
- Grid/List view toggle

### Phase 3: User Management ✅
- Supabase authentication
- Login/Signup flows
- Multi-step checkout
- Address management
- Order placement
- User profile & order history

### Phase 4: Business Dashboards ✅
- Complete admin dashboard (7 sections)
- Complete vendor dashboard (5 sections)
- Analytics & reporting
- Inventory management
- User & order management

---

## 🛠️ Tech Stack

### Frontend (All 3 Apps)
- **Framework:** Next.js 15.5.6 (App Router)
- **Language:** TypeScript 5.3.3
- **Styling:** Tailwind CSS 3.4.1
- **UI Components:** Radix UI + Custom
- **Icons:** Lucide React 0.314.0
- **State:** Zustand 4.5.0 + SWR 2.3.6
- **Forms:** React Hook Form 7.66.0
- **Validation:** Zod 3.25.76
- **Theme:** next-themes 0.2.1

### Backend
- **Runtime:** Node.js 20.19.5
- **Framework:** Express.js 4.21.2
- **Language:** TypeScript 5.9.3
- **Database:** PostgreSQL (Supabase) + MongoDB (Atlas)
- **ORM:** Prisma 5.22.0
- **ODM:** Mongoose 8.19.3
- **Auth:** Supabase Auth
- **Security:** Helmet, CORS, Rate Limiting

### Infrastructure
- **Monorepo:** Turborepo 1.13.4
- **Package Manager:** pnpm 10.20.0
- **Code Quality:** ESLint, Prettier, Husky

---

## 📦 Project Structure

```
one-medi/
├── apps/
│   ├── web/          # Customer app (Port 3000)
│   ├── admin/        # Admin dashboard (Port 3001)
│   ├── vendor/       # Vendor dashboard (Port 3002)
│   └── backend/      # API server (Port 8001)
├── packages/
│   ├── ui/           # Shared UI components
│   ├── utils/        # Utility functions
│   ├── hooks/        # React hooks
│   ├── config/       # Configuration
│   ├── validation/   # Zod schemas
│   ├── prisma/       # Database client
│   └── auth/         # Auth utilities
└── docs/             # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Clone repository
git clone <repository-url>
cd one-medi

# Install dependencies
pnpm install

# Setup environment variables
cp apps/backend/.env.example apps/backend/.env
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local
cp apps/vendor/.env.example apps/vendor/.env.local

# Edit .env files with your credentials
```

### Running the Application

**Start All Services:**
```bash
pnpm dev
```

**Start Individual Services:**
```bash
pnpm dev --filter=@one-medi/backend   # Backend API
pnpm dev --filter=@one-medi/web       # Customer app
pnpm dev --filter=@one-medi/admin     # Admin dashboard
pnpm dev --filter=@one-medi/vendor    # Vendor dashboard
```

---

## 📚 Documentation

Detailed documentation available in:

- **PROJECT_SUMMARY.md** - Complete project guide (1,549 lines)
- **ARCHITECTURE.md** - System architecture & design
- **ENV_SETUP.md** - Environment configuration guide
- **README.md** - This file

---

## 🧪 Testing

### Backend API
```bash
curl http://localhost:8001/api/v1/health
curl http://localhost:8001/api/v1/products
curl http://localhost:8001/api/v1/lab-tests
```

### Frontend
1. Open http://localhost:3000
2. Browse products
3. Add items to cart
4. Complete checkout
5. Login/Signup
6. View profile

### Admin Dashboard
1. Open http://localhost:3001
2. Navigate through all sections
3. Test search functionality
4. Update order statuses
5. View analytics

### Vendor Dashboard
1. Open http://localhost:3002
2. View revenue analytics
3. Check inventory alerts
4. Manage product listings
5. Fulfill orders

---

## 📊 Key Features

### Customer App
- 🛒 Shopping cart with persistence
- 🔍 Product search & filters
- 💳 Multi-step checkout
- 🔐 User authentication
- 📱 Fully responsive design
- 🌙 Dark mode support
- 📦 Order tracking
- 👤 User profile management

### Admin Dashboard
- 📊 Analytics & reporting
- 📦 Product management
- 🛍️ Order management
- 👥 User administration
- 🧪 Lab test catalog
- ⚙️ Settings & configuration
- 🔍 Search & filters

### Vendor Dashboard
- 💰 Revenue analytics
- 📦 Product listings
- 🚚 Order fulfillment
- 📊 Inventory management
- ⚠️ Low stock alerts
- 📈 Performance metrics

---

## 🎨 Design System

**Brand Colors:**
- Primary (Teal): #14b8a6
- Secondary (Purple): #8b5cf6

**Responsive Breakpoints:**
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

---

## 📞 Support

For detailed setup instructions, API documentation, and troubleshooting, please refer to:
- PROJECT_SUMMARY.md (comprehensive guide)
- ARCHITECTURE.md (technical details)
- ENV_SETUP.md (configuration)

---

## 📄 License

Proprietary - All Rights Reserved  
© 2025 ONE MEDI Healthcare Platform

---

**Built with ❤️ for Healthcare in India**
