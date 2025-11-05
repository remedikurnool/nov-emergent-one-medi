# 🏗️ ONE MEDI - Architecture Documentation

**Last Updated:** November 4, 2025  
**Version:** 1.0.0 - MVP Complete  
**Status:** Phases 0-4 Completed

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Application Layer](#application-layer)
4. [Backend Architecture](#backend-architecture)
5. [Frontend Architecture](#frontend-architecture)
6. [Database Design](#database-design)
7. [Authentication & Authorization](#authentication--authorization)
8. [API Design](#api-design)
9. [State Management](#state-management)
10. [Deployment Architecture](#deployment-architecture)

---

## System Overview

ONE MEDI is built as a **Turborepo monorepo** containing multiple applications that share common packages and utilities. The architecture follows a **microservices-inspired approach** with clear separation between customer-facing features, admin operations, and vendor management.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT APPLICATIONS                          │
├────────────────┬───────────────┬──────────────────────────────┤
│  Customer App   │  Admin Panel  │  Vendor Dashboard          │
│  (Next.js 15)   │  (Next.js 15) │  (Next.js 15)              │
│  Port: 3000     │  Port: 3001   │  Port: 3002                │
│  18+ Pages      │  7 Sections   │  5 Sections                │
└────────┬───────┴─────────┬────┴───────────┬───────────────┘
         │                   │                  │
         └───────────────────┼──────────────────┘
                             │
                    ┌────────────┼────────────┐
                    │   REST API   │
                    │ Express.js  │
                    │ Port: 8001  │
                    └────────────┼────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────▼─────┐      ┌─────▼──────┐    ┌─────▼─────┐
    │PostgreSQL│      │  Supabase  │    │  MongoDB  │
    │ (Prisma) │      │   Auth &   │    │   Logs &  │
    │  Ready   │      │  Storage   │    │ Analytics │
    └──────────┘      └────────────┘    └───────────┘
```

---

## Application Layer

### 1. Customer Web Application (Port 3000)

**Purpose:** Customer-facing e-commerce platform

**Key Features:**
- Product browsing and search
- Shopping cart management
- Checkout flow (3 steps)
- User authentication
- Order history
- Profile management
- 12 healthcare service modules

**Technology:**
- Next.js 15 App Router
- Zustand for cart state
- Supabase Auth for authentication
- Tailwind CSS for styling
- Responsive design (mobile-first)

**Routes:**
```
/                          # Home page
/medicines                 # Medicines listing
/medicines/[id]            # Product detail
/lab-tests                 # Lab tests listing
/lab-tests/[id]            # Test detail
/cart                      # Shopping cart
/checkout                  # Checkout flow
/profile                   # User profile
/orders                    # Order history
/orders/success            # Order confirmation
/scans                     # Scans module
/doctors                   # Doctors module
/diabetes-care             # Diabetes care
/home-nursing-care         # Home nursing
/physiotherapy             # Physiotherapy
/hospitals                 # Hospitals
/surgery-opinion           # Surgery opinions
/ambulance                 # Emergency services
/insurance                 # Insurance plans
/diet-wellness             # Diet & wellness
```

### 2. Admin Dashboard (Port 3001)

**Purpose:** Administrative control panel

**Key Features:**
- Dashboard with analytics
- Product catalog management
- Order management
- User administration
- Lab test management
- Revenue reports
- System settings

**Technology:**
- Next.js 15 App Router
- Collapsible sidebar navigation
- Data tables with search
- Charts and graphs
- Real-time stats

**Routes:**
```
/dashboard                 # Main dashboard
/products                  # Product management
/orders                    # Order management
/users                     # User management
/lab-tests                 # Lab test management
/analytics                 # Analytics & reports
/settings                  # Configuration
```

**Admin Features by Section:**

**Dashboard:**
- Key metrics (Revenue, Orders, Products, Users)
- Recent orders feed
- Quick stats panel
- Performance indicators

**Products:**
- Product list table
- Search products
- Filter by category
- Add new product
- Edit product details
- Delete products
- Stock level indicators
- Status management

**Orders:**
- Order list table
- Search orders
- Filter by status
- Update order status
- View order details
- Customer information
- Date and time tracking

**Users:**
- User list table
- Search users
- Role badges (USER, ADMIN, VENDOR)
- Status indicators
- Order count per user
- User actions (View, Suspend)

**Lab Tests:**
- Test catalog table
- Add new tests
- Edit test details
- Parameter management
- Pricing configuration
- Popular test marking

**Analytics:**
- Monthly revenue charts
- Top selling products
- Sales trends (6 months)
- Order analytics
- Performance metrics

**Settings:**
- Site configuration
- Delivery settings
- Email settings
- Save changes

### 3. Vendor Dashboard (Port 3002)

**Purpose:** Vendor management portal

**Key Features:**
- Revenue analytics
- Product listings
- Order fulfillment
- Inventory tracking
- Stock alerts
- Performance metrics

**Technology:**
- Next.js 15 App Router
- Sidebar navigation
- Grid and table views
- Charts and analytics

**Routes:**
```
/dashboard                 # Vendor overview
/products                  # Product listings
/orders                    # Orders to fulfill
/inventory                 # Stock management
/revenue                   # Revenue analytics
/settings                  # Vendor settings
```

**Vendor Features by Section:**

**Dashboard:**
- Revenue metrics
- Order statistics
- Product count
- Pending orders alert
- Recent orders table

**Products:**
- Product cards grid
- Add new product
- Edit product
- Product status
- Stock levels
- Pricing display

**Orders:**
- Orders table
- Customer info
- Product details
- Fulfillment status
- Update order status
- View details

**Inventory:**
- Stock tracking table
- Low stock alerts
- Reorder level indicators
- Update stock button
- Color-coded status
- Alert banner for low stock

**Revenue:**
- Total revenue summary
- Monthly breakdown
- Revenue charts
- Growth indicators
- Order count trends
- 6-month history

### 4. Backend API Server (Port 8001)

**Purpose:** RESTful API server

**Technology:**
- Express.js with TypeScript
- Prisma ORM (PostgreSQL)
- Mongoose ODM (MongoDB)
- JWT authentication (ready)
- CORS middleware
- Helmet security
- Morgan logging

**API Structure:**
```
/api/v1/
  /health              # Health check
  /products            # Product CRUD
  /lab-tests           # Lab test CRUD
  /orders              # Order management
```

---

## Backend Architecture

### Express.js Server Structure

```
apps/backend/src/
├── index.ts              # Main server file
├── config/
│   ├── mongodb.ts        # MongoDB connection
│   └── supabase.ts       # Supabase client
├── routes/
│   ├── health.routes.ts  # Health check routes
│   ├── product.routes.ts # Product routes
│   ├── labtest.routes.ts # Lab test routes
│   └── order.routes.ts   # Order routes
├── controllers/
│   ├── product.controller.ts
│   ├── labtest.controller.ts
│   └── order.controller.ts
├── middleware/
│   └── error-handler.ts  # Error handling
├── models/
│   └── log.model.ts      # MongoDB schemas
└── utils/              # Helper functions
```

### API Request Flow

1. Client sends HTTP request
2. CORS middleware validates origin
3. Body parser processes request data
4. Route handler matches endpoint
5. Controller processes business logic
6. Prisma/Mongoose queries database
7. Response formatted and sent
8. Error handler catches any errors
9. Morgan logs the request

### Middleware Stack

1. **Helmet** - Security headers
2. **CORS** - Cross-origin requests
3. **Compression** - Response compression
4. **Body Parser** - JSON/URL-encoded parsing
5. **Morgan** - HTTP request logging
6. **Error Handler** - Centralized error handling

---

## Frontend Architecture

### Next.js App Router Structure

All three frontend apps follow the same structure:

```
apps/{web|admin|vendor}/src/
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home/redirect page
│   └── [routes]/         # Feature routes
├── components/
│   ├── header.tsx        # Header component
│   ├── sidebar.tsx       # Sidebar (admin/vendor)
│   └── layout.tsx        # Layout wrapper
├── lib/
│   ├── api.ts            # API client
│   ├── supabase.ts       # Supabase client
│   ├── auth-provider.tsx # Auth context
│   └── store/            # Zustand stores
└── styles/
    └── globals.css       # Global styles
```

### Component Architecture

**Layout Components:**
- `AppLayout` - Customer app wrapper (header + bottom nav)
- `AdminLayout` - Admin wrapper (sidebar + header + main)
- `VendorLayout` - Vendor wrapper (sidebar + header + main)

**Navigation Components:**
- `Header` - Responsive header with auth
- `BottomNav` - Mobile-only bottom navigation
- `AdminSidebar` - Collapsible admin navigation
- `VendorSidebar` - Collapsible vendor navigation

**Feature Components:**
- `AuthModal` - Login/Signup modal
- `ProtectedRoute` - Authentication guard
- `ProductCard` - Product display card
- `LabTestCard` - Lab test display card

### State Management Strategy

**Zustand (Client State):**
- Shopping cart
- UI state (modals, sidebars)
- User preferences

**React Context:**
- Authentication state
- Theme (dark/light mode)

**SWR (Server State):**
- API data caching (ready)
- Revalidation
- Optimistic updates

**LocalStorage:**
- Cart persistence
- User preferences
- Auth tokens (via Supabase)

---

## Database Design

### PostgreSQL (Supabase) - Primary Database

**Purpose:** Structured data storage

**Models (13):**

1. **User**
   - id, email, phone, firstName, lastName
   - password (hashed), role, status
   - avatar, dateOfBirth, gender
   - Relations: addresses, orders, bookings, reviews

2. **Address**
   - id, userId, type (HOME/WORK/OTHER)
   - fullName, phone, addressLine1, addressLine2
   - city, state, pincode, isDefault

3. **Product**
   - id, name, slug, description
   - category, brand, manufacturer, composition
   - price, mrp, discount, stock
   - unit, requiresPrescription, images
   - status, tags

4. **Order**
   - id, orderNumber, userId, addressId
   - subtotal, discount, deliveryCharge, tax, total
   - status, paymentMethod, paymentStatus
   - Relations: user, address, items, payment

5. **OrderItem**
   - id, orderId, productId
   - quantity, price, discount, total

6. **Payment**
   - id, orderId, bookingId
   - amount, status, method
   - transactionId, razorpayOrderId
   - metadata

7. **LabTest**
   - id, name, slug, description
   - category, price, parameters[]
   - preparation, reportTime, isPopular

8. **Booking**
   - id, bookingNumber, userId, addressId
   - type, status
   - labTestId, collectionType
   - scheduledDate, scheduledTime
   - price, paymentMethod, paymentStatus

9. **Review**
   - id, userId, productId
   - rating (1-5), title, comment
   - isVerified

10. **Prescription**
    - id, userId
    - imageUrl, notes
    - isVerified, verifiedAt, verifiedBy

**Indexes:**
- User: email, phone (unique)
- Product: slug (unique), category, status
- Order: orderNumber (unique), userId, status
- LabTest: slug (unique), category
- Booking: bookingNumber (unique), userId

### MongoDB (Atlas) - Logs & Analytics

**Collections:**

1. **logs**
   - level (info/warn/error/debug)
   - message, service
   - metadata, userId
   - timestamp (with TTL index: 30 days)

2. **analytics** (Planned)
   - User activity tracking
   - Page views
   - Search queries
   - Click events

---

## Authentication & Authorization

### Supabase Authentication Flow

```
1. User signs up/logs in via Supabase Auth
   ↓
2. Supabase validates credentials
   ↓
3. JWT token generated and returned
   ↓
4. Token stored in httpOnly cookie
   ↓
5. Frontend sends token with each request
   ↓
6. Backend validates token (Supabase SDK)
   ↓
7. User data fetched from PostgreSQL
   ↓
8. Request processed with user context
```

### Authentication Components

**Frontend:**
- `AuthProvider` - Global auth context
- `useAuth()` - Hook to access auth state
- `ProtectedRoute` - Route guard HOC
- `AuthModal` - Login/Signup UI

**Backend:**
- Supabase client configuration
- JWT validation middleware (ready)
- User session management

### Role-Based Access Control (RBAC)

**Roles:**
- `USER` - Customer access
- `ADMIN` - Full admin access
- `VENDOR` - Vendor dashboard access
- `DOCTOR` - Doctor portal (planned)
- `LAB_ADMIN` - Lab management (planned)

**Access Matrix:**

| Feature | USER | ADMIN | VENDOR |
|---------|------|-------|--------|
| Browse Products | ✅ | ✅ | ✅ |
| Shopping Cart | ✅ | ❌ | ❌ |
| Place Orders | ✅ | ❌ | ❌ |
| Manage Products | ❌ | ✅ | ✅ (own) |
| Manage Orders | ❌ | ✅ | ✅ (own) |
| Manage Users | ❌ | ✅ | ❌ |
| View Analytics | ❌ | ✅ | ✅ (own) |

---

## API Design

### RESTful API Principles

**Base URL:** `/api/v1`

**HTTP Methods:**
- GET - Retrieve resources
- POST - Create resources
- PUT - Update resources
- DELETE - Delete resources

**Response Format:**

**Success:**
```json
{
  "success": true,
  "data": {...},
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  },
  "timestamp": "2025-11-04T12:00:00Z"
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  },
  "timestamp": "2025-11-04T12:00:00Z"
}
```

### API Endpoints

**Products:**
- `GET /products` - List products
- `GET /products/:id` - Get product
- `GET /products/search/:query` - Search
- `GET /products/category/:category` - Filter
- `POST /products` - Create
- `PUT /products/:id` - Update
- `DELETE /products/:id` - Delete

**Lab Tests:**
- `GET /lab-tests` - List tests
- `GET /lab-tests/:id` - Get test
- `GET /lab-tests/search/:query` - Search
- `POST /lab-tests` - Create
- `PUT /lab-tests/:id` - Update
- `DELETE /lab-tests/:id` - Delete

**Orders:**
- `GET /orders` - List orders
- `GET /orders/:id` - Get order
- `POST /orders` - Create order
- `PUT /orders/:id` - Update status

**Pagination:**
- Query params: `?page=1&limit=20`
- Default: page=1, limit=20
- Max limit: 100

---

## State Management

### Zustand Stores

**Cart Store:**
```typescript
interface CartStore {
  items: CartItem[];
  addItem: (item) => void;
  removeItem: (id) => void;
  updateQuantity: (id, quantity) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}
```

**Features:**
- Persistent to localStorage
- Auto-save on changes
- Type-safe with TypeScript
- Computed values (totals)

### React Context

**Auth Context:**
```typescript
interface AuthContext {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}
```

**Features:**
- Session management
- Auto-refresh tokens
- User state across app
- Sign out functionality

---

## Security Architecture

### Frontend Security

**Implemented:**
- XSS protection (React escaping)
- CSRF protection (Supabase handles)
- Secure cookie handling
- Input validation (Zod)
- Environment variable protection

**Best Practices:**
- No sensitive data in localStorage
- Auth tokens in httpOnly cookies
- API keys in environment variables
- Form validation on client & server

### Backend Security

**Implemented:**
- Helmet.js security headers
- CORS configuration
- Request body validation
- Error message sanitization
- Environment-based secrets

**Ready for Production:**
- JWT authentication
- Password hashing (bcrypt)
- Rate limiting (configured)
- SQL injection prevention (Prisma)
- Input sanitization (Zod)

### Database Security

**PostgreSQL (Supabase):**
- Row Level Security (RLS) - Ready
- Encrypted connections (SSL/TLS)
- Connection pooling
- Database backups (Supabase)

**MongoDB (Atlas):**
- Encrypted connections
- IP whitelist
- Database user authentication
- TTL indexes for log cleanup

---

## Deployment Architecture

### Recommended Setup

**Frontend Apps (Vercel):**
```
Web App:    onemedi.vercel.app
Admin:      admin.onemedi.vercel.app
Vendor:     vendor.onemedi.vercel.app
```

**Backend (Railway/Render/Azure):**
```
API:        api.onemedi.com
Health:     api.onemedi.com/api/v1/health
```

**Databases:**
```
PostgreSQL: Supabase (Managed)
MongoDB:    Atlas (M0 Free Tier)
```

### Environment Configuration

**Development:**
- Local PostgreSQL or Supabase project
- Local MongoDB or Atlas cluster
- localhost URLs
- Verbose logging

**Staging:**
- Staging Supabase project
- Staging MongoDB cluster
- Staging URLs
- Testing integrations

**Production:**
- Production Supabase project
- Production MongoDB cluster
- Custom domain URLs
- Optimized logging
- CDN for static assets

---

## Performance Optimization

### Frontend Optimizations

**Implemented:**
- Next.js automatic code splitting
- Image optimization (ready for next/image)
- Font optimization (Google Fonts)
- CSS purging (Tailwind)
- Lazy loading (React.lazy ready)

**Ready for Implementation:**
- Service Worker (PWA)
- Route prefetching
- CDN for static assets
- Image CDN (Cloudinary/Supabase Storage)

### Backend Optimizations

**Implemented:**
- Response compression (gzip)
- CORS optimization
- JSON parsing limits

**Ready for Implementation:**
- Redis caching
- Database query optimization
- Connection pooling
- Load balancing
- Horizontal scaling

### Database Optimizations

**Ready for Implementation:**
- Indexed columns
- Query optimization
- Connection pooling (Supabase)
- Read replicas (Supabase Pro)

---

## Monitoring & Logging

### Application Logging

**Backend (Morgan):**
- HTTP request logs
- Response time
- Status codes
- Development: verbose
- Production: combined format

**MongoDB Logs:**
- Application events
- Error tracking
- User activity
- TTL: 30 days auto-delete

### Monitoring (Planned)

**Application:**
- Sentry (Error tracking)
- LogRocket (Session replay)
- Google Analytics (User analytics)

**Infrastructure:**
- Uptime monitoring
- API latency tracking
- Database metrics
- Server health checks

---

## Scalability Considerations

### Horizontal Scaling

**Backend:**
- Stateless server design
- Session storage in Supabase
- Load balancer ready
- Multiple instances supported

**Database:**
- Connection pooling (Supabase)
- Read replicas (when needed)
- Sharding (MongoDB Atlas)

### Vertical Scaling

**Optimization Strategies:**
- Efficient database queries
- Caching layer (Redis planned)
- Code optimization
- Asset optimization

---

## Data Flow Diagrams

### Shopping Cart Flow

```
User clicks "Add to Cart"
  ↓
Zustand store updates
  ↓
LocalStorage saves cart
  ↓
Header counter updates
  ↓
User navigates to cart
  ↓
Cart page displays items
  ↓
User proceeds to checkout
  ↓
Auth check (ProtectedRoute)
  ↓
Checkout flow (3 steps)
  ↓
Order API call
  ↓
Database saves order
  ↓
Cart cleared
  ↓
Success page shown
```

### Order Processing Flow

```
Customer places order
  ↓
POST /api/v1/orders
  ↓
Validate cart items
  ↓
Calculate totals (subtotal, tax, delivery)
  ↓
Generate order number
  ↓
Create order in database
  ↓
Create order items
  ↓
Return order confirmation
  ↓
Admin sees order in dashboard
  ↓
Vendor sees order for their products
  ↓
Vendor updates status
  ↓
Customer sees updated status
  ↓
Order delivered
```

---

## Technology Decisions

### Why Turborepo?
- **Code Sharing:** Shared packages across apps
- **Build Optimization:** Intelligent caching
- **Scalability:** Easy to add more apps
- **Developer Experience:** Unified commands

### Why Next.js 15?
- **App Router:** Latest routing paradigm
- **Server Components:** Performance benefits
- **Image Optimization:** Built-in
- **TypeScript:** First-class support
- **Deployment:** Vercel integration

### Why Zustand?
- **Simplicity:** Minimal boilerplate
- **Performance:** No re-render issues
- **Persistence:** Easy localStorage integration
- **TypeScript:** Excellent type inference
- **Size:** Lightweight (~1KB)

### Why Supabase?
- **All-in-One:** Auth + Database + Storage
- **PostgreSQL:** Powerful relational DB
- **Real-time:** Built-in subscriptions
- **Row Level Security:** Fine-grained permissions
- **Developer Experience:** Excellent DX

### Why Mock Data (Current)?
- **Fast Development:** No DB setup needed
- **Isolated Testing:** No external dependencies
- **Easy to Replace:** Switch to real DB anytime
- **Predictable:** Same data every time

---

## Future Enhancements

### Phase 5: Integrations (Planned)
- Razorpay payment gateway
- SendGrid email service
- Twilio SMS notifications
- WhatsApp Business API
- Google Maps for locations

### Phase 6: Advanced Features (Planned)
- Video consultations (doctors)
- Prescription OCR
- AI-powered recommendations
- Chatbot support
- Mobile apps (React Native)

### Phase 7: Optimization (Planned)
- Redis caching
- CDN integration
- Image optimization
- SEO optimization
- Performance monitoring

---

## Conclusion

ONE MEDI is architected as a **scalable, maintainable, and production-ready** healthcare platform. The monorepo structure allows for code sharing and unified development, while the separation of concerns ensures each application can scale independently.

**Current Status:** All core features implemented and functional with mock data, ready for database connection and production deployment.

---

**Document Version:** 2.0  
**Last Updated:** Phase 4 Completion  
**Next Review:** Phase 5 Completion
