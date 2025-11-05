# ⚙️ Environment Variables Configuration Guide

**ONE MEDI Platform**  
**Last Updated:** November 4, 2025  
**Version:** 1.0.0

---

## 📚 Table of Contents

1. [Overview](#overview)
2. [Backend Environment Variables](#backend-environment-variables)
3. [Frontend Environment Variables](#frontend-environment-variables)
4. [Database Configuration](#database-configuration)
5. [Authentication Setup](#authentication-setup)
6. [Integration Keys](#integration-keys)
7. [Environment-Specific Configuration](#environment-specific-configuration)
8. [Security Best Practices](#security-best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Overview

ONE MEDI uses environment variables to manage configuration across different environments (development, staging, production). This guide provides detailed instructions for setting up all required environment variables.

### Files Required

```
apps/backend/.env              # Backend API configuration
apps/web/.env.local            # Customer app configuration
apps/admin/.env.local          # Admin dashboard configuration
apps/vendor/.env.local         # Vendor dashboard configuration
packages/prisma/.env           # Database connection for migrations
```

---

## Backend Environment Variables

### File: `apps/backend/.env`

```env
# ============================================
# SERVER CONFIGURATION
# ============================================
PORT=8001
NODE_ENV=development

# ============================================
# DATABASE - POSTGRESQL (SUPABASE)
# ============================================

# Session mode connection (port 5432) - for persistent connections
# Format: postgresql://postgres.{PROJECT_REF}:{PASSWORD}@{REGION}.pooler.supabase.com:5432/postgres
DATABASE_URL=postgresql://postgres.sjrvvsnjnxubasvygdpr:KurnoolRemedi%4023@aws-0-ap-south-1.pooler.supabase.com:5432/postgres

# Direct connection - for migrations
# Format: postgresql://postgres:{PASSWORD}@db.{PROJECT_REF}.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:KurnoolRemedi%4023@db.sjrvvsnjnxubasvygdpr.supabase.co:5432/postgres

# Supabase Project URL
SUPABASE_URL=https://sjrvvsnjnxubasvygdpr.supabase.co

# Supabase Anonymous Key (public, safe to expose)
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcnZ2c25qbnh1YmFzdnlnZHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODcwMDEsImV4cCI6MjA3NzY2MzAwMX0.ScsSHlhDRxXy1eZckn5-IVkbJLDxFzP0HRS5-pAUzvE

# Supabase Service Role Key (SECRET - server-side only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcnZ2c25qbnh1YmFzdnlnZHByIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjA4NzAwMSwiZXhwIjoyMDc3NjYzMDAxfQ.L8aixbm23sDVmk-YjYdQZ7ALLomJVu5wg2k6XNSs9eE

# ============================================
# DATABASE - MONGODB (LOGS & ANALYTICS)
# ============================================

# MongoDB Atlas connection string
# Format: mongodb+srv://{USERNAME}:{PASSWORD}@{CLUSTER}.mongodb.net/{DATABASE}
MONGODB_URI=mongodb+srv://onemediapp_db_user:KurnoolRemedi%4023@cluster0.gjnf16e.mongodb.net/onemedi-logs?retryWrites=true&w=majority&appName=Cluster0

# ============================================
# JWT CONFIGURATION
# ============================================

# Secret key for JWT signing (minimum 32 characters)
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=one-medi-jwt-secret-key-2024-healthcare-platform-kurnool-india

# JWT token expiration
JWT_EXPIRES_IN=7d

# ============================================
# API CONFIGURATION
# ============================================

API_VERSION=v1
API_PREFIX=/api

# ============================================
# CORS CONFIGURATION
# ============================================

# Allowed origins (comma-separated)
CORS_ORIGIN=http://localhost:3000,http://localhost:3001,http://localhost:3002

# ============================================
# RATE LIMITING
# ============================================

# Time window in milliseconds (default: 15 minutes)
RATE_LIMIT_WINDOW_MS=900000

# Max requests per window
RATE_LIMIT_MAX_REQUESTS=100

# ============================================
# PAYMENT GATEWAY (RAZORPAY) - OPTIONAL
# ============================================

# Razorpay Key ID (from dashboard)
RAZORPAY_KEY_ID=your_razorpay_key_id

# Razorpay Key Secret (SECRET)
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# ============================================
# EMAIL SERVICE (SENDGRID) - OPTIONAL
# ============================================

SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@onemedi.com
SENDGRID_FROM_NAME=ONE MEDI

# ============================================
# SMS SERVICE (TWILIO) - OPTIONAL
# ============================================

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+919999999999

# ============================================
# WHATSAPP BUSINESS API - OPTIONAL
# ============================================

WHATSAPP_API_KEY=your_whatsapp_api_key
WHATSAPP_PHONE_NUMBER=+919999999999
```

### Important Notes for Backend .env

**Password Encoding:**
- Special characters must be URL-encoded
- Example: `@23` becomes `%4023`
- Use online URL encoder or Node.js:
  ```bash
  node -e "console.log(encodeURIComponent('YourPassword@23'))"
  ```

**Database URLs:**
- `DATABASE_URL`: Use session mode (port 5432) with `postgres.{PROJECT_REF}` prefix
- `DIRECT_URL`: Use direct connection with `db.{PROJECT_REF}` prefix
- Both connections support SSL by default

**JWT Secret:**
- Must be at least 32 characters
- Use cryptographically secure random string
- Never commit to version control
- Different secret for each environment

---

## Frontend Environment Variables

### Customer App: `apps/web/.env.local`

```env
# ============================================
# API CONFIGURATION
# ============================================

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1

# ============================================
# SUPABASE CONFIGURATION
# ============================================

# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://sjrvvsnjnxubasvygdpr.supabase.co

# Supabase Anonymous Key (safe to expose)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcnZ2c25qbnh1YmFzdnlnZHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODcwMDEsImV4cCI6MjA3NzY2MzAwMX0.ScsSHlhDRxXy1eZckn5-IVkbJLDxFzP0HRS5-pAUzvE

# ============================================
# APP CONFIGURATION
# ============================================

NEXT_PUBLIC_APP_NAME=ONE MEDI
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Admin Dashboard: `apps/admin/.env.local`

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1

# Supabase Configuration  
NEXT_PUBLIC_SUPABASE_URL=https://sjrvvsnjnxubasvygdpr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcnZ2c25qbnh1YmFzdnlnZHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODcwMDEsImV4cCI6MjA3NzY2MzAwMX0.ScsSHlhDRxXy1eZckn5-IVkbJLDxFzP0HRS5-pAUzvE

# App Configuration
NEXT_PUBLIC_APP_NAME=ONE MEDI Admin
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### Vendor Dashboard: `apps/vendor/.env.local`

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://sjrvvsnjnxubasvygdpr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcnZ2c25qbnh1YmFzdnlnZHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODcwMDEsImV4cCI6MjA3NzY2MzAwMX0.ScsSHlhDRxXy1eZckn5-IVkbJLDxFzP0HRS5-pAUzvE

# App Configuration
NEXT_PUBLIC_APP_NAME=ONE MEDI Vendor
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

### Important Notes for Frontend .env

**NEXT_PUBLIC_ Prefix:**
- All variables exposed to browser must have `NEXT_PUBLIC_` prefix
- Never put secrets in NEXT_PUBLIC_ variables
- Only use for non-sensitive configuration

**API URL:**
- Development: `http://localhost:8001/api/v1`
- Production: `https://api.yourdomain.com/api/v1`
- Must include `/api/v1` suffix

---

## Database Configuration

### Prisma Database: `packages/prisma/.env`

```env
# Session mode connection for Prisma
DATABASE_URL="postgresql://postgres.sjrvvsnjnxubasvygdpr:KurnoolRemedi%4023@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"

# Direct connection for migrations
DIRECT_URL="postgresql://postgres:KurnoolRemedi%4023@db.sjrvvsnjnxubasvygdpr.supabase.co:5432/postgres"
```

### Supabase Connection Modes

**Session Mode (Port 5432):**
- Use for persistent connections
- Supports prepared statements
- Best for backend servers
- Format: `postgres.{PROJECT_REF}:{PASSWORD}@{REGION}.pooler.supabase.com:5432/postgres`

**Transaction Mode (Port 6543):**
- Use for serverless/edge functions
- Does NOT support prepared statements
- Best for short-lived connections
- Format: `postgres.{PROJECT_REF}:{PASSWORD}@{REGION}.pooler.supabase.com:6543/postgres`

**Direct Connection:**
- Use for migrations and admin tools
- Bypasses connection pooler
- Format: `postgres:{PASSWORD}@db.{PROJECT_REF}.supabase.co:5432/postgres`

### MongoDB Atlas Configuration

**Connection String Format:**
```
mongodb+srv://{USERNAME}:{PASSWORD}@{CLUSTER}.mongodb.net/{DATABASE}?retryWrites=true&w=majority
```

**Example:**
```
mongodb+srv://onemediapp_db_user:KurnoolRemedi%4023@cluster0.gjnf16e.mongodb.net/onemedi-logs?retryWrites=true&w=majority&appName=Cluster0
```

**Configuration:**
- Cluster: Free tier M0 (512MB)
- Region: Choose closest to your users
- Database: `onemedi-logs`
- Collections: `logs`, `analytics`

---

## Authentication Setup

### Supabase Auth Configuration

**How to Get Credentials:**

1. **Go to Supabase Dashboard:**
   - URL: https://supabase.com/dashboard
   - Login or create account

2. **Navigate to Your Project:**
   - Select: ONE MEDI project
   - Project Reference: `sjrvvsnjnxubasvygdpr`

3. **Get API Keys:**
   - Go to Settings → API
   - Copy:
     - **Project URL:** `SUPABASE_URL`
     - **anon/public key:** `SUPABASE_ANON_KEY`
     - **service_role key:** `SUPABASE_SERVICE_ROLE_KEY`

4. **Get Database Password:**
   - Go to Settings → Database
   - Find connection string
   - Extract or reset password
   - Remember to URL-encode special characters

**Auth Configuration in Supabase:**

1. **Enable Email Provider:**
   - Go to Authentication → Providers
   - Enable Email provider
   - Configure email templates

2. **Set Site URL:**
   - Go to Authentication → URL Configuration
   - Site URL: `http://localhost:3000` (dev) or your domain (prod)
   - Redirect URLs: Add all your app URLs

3. **Email Templates:**
   - Customize confirmation email
   - Customize password reset email
   - Add your branding

**JWT Secret:**

Generate a secure random secret:

```bash
# Method 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Method 2: Using OpenSSL
openssl rand -hex 32

# Method 3: Online generator
# Visit: https://randomkeygen.com/
```

---

## Integration Keys

### Razorpay (Payment Gateway)

**How to Get:**
1. Sign up at https://razorpay.com
2. Complete KYC verification
3. Go to Settings → API Keys
4. Generate Test/Live keys
5. Copy Key ID and Key Secret

**Test Mode vs Live Mode:**
- Test Mode: For development (test cards work)
- Live Mode: For production (real transactions)
- Always use Test Mode during development

**Variables:**
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
```

### SendGrid (Email Service)

**How to Get:**
1. Sign up at https://sendgrid.com
2. Verify your email
3. Go to Settings → API Keys
4. Create API Key with Full Access
5. Copy the key (shown only once)

**Variables:**
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@onemedi.com
SENDGRID_FROM_NAME=ONE MEDI
```

**Email Verification:**
- Verify sender email in SendGrid
- Add DNS records for domain authentication
- Test email sending

### Twilio (SMS Service)

**How to Get:**
1. Sign up at https://twilio.com
2. Complete phone verification
3. Go to Console → Account Info
4. Copy Account SID and Auth Token
5. Buy a phone number

**Variables:**
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+919999999999
```

### WhatsApp Business API

**How to Get:**
1. Apply for WhatsApp Business API
2. Complete verification
3. Get API credentials
4. Configure message templates

**Variables:**
```env
WHATSAPP_API_KEY=your_whatsapp_api_key
WHATSAPP_PHONE_NUMBER=+919999999999
```

---

## Environment-Specific Configuration

### Development Environment

**Characteristics:**
- Local servers (localhost)
- Verbose logging
- Hot reload enabled
- Test payment gateway
- Staging database

**Configuration:**
```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Staging Environment

**Characteristics:**
- Deployed servers
- Production-like setup
- Test integrations
- Staging database
- Limited logging

**Configuration:**
```env
NODE_ENV=staging
NEXT_PUBLIC_API_URL=https://api-staging.onemedi.com/api/v1
NEXT_PUBLIC_APP_URL=https://staging.onemedi.com
```

### Production Environment

**Characteristics:**
- Production servers
- Optimized builds
- Real payment gateway
- Production database
- Error-only logging

**Configuration:**
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.onemedi.com/api/v1
NEXT_PUBLIC_APP_URL=https://onemedi.com
```

---

## Security Best Practices

### ✅ DO's

1. **Use .env files for all secrets**
   - Never hardcode credentials
   - Use environment variables everywhere

2. **Different credentials per environment**
   - Development, Staging, Production
   - Separate database instances
   - Separate API keys

3. **Rotate secrets regularly**
   - Change JWT secret periodically
   - Rotate API keys quarterly
   - Update database passwords

4. **Use strong secrets**
   - Minimum 32 characters
   - Include special characters
   - Use random generation

5. **Restrict access**
   - Least privilege principle
   - Role-based access control
   - IP whitelisting for databases

### ❌ DON'Ts

1. **Never commit .env files**
   - Add to .gitignore
   - Use .env.example templates
   - Document required variables

2. **Never expose secrets in frontend**
   - No NEXT_PUBLIC_ for secrets
   - Backend-only for sensitive data
   - Service role key server-side only

3. **Never share credentials**
   - Don't email passwords
   - Don't share in chat
   - Use secure password managers

4. **Never use default secrets**
   - Change all example values
   - Generate unique secrets
   - Don't use 'password123'

---

## Troubleshooting

### Common Issues

**1. Database Connection Failed**

**Error:** `Can't reach database server`

**Solutions:**
- Check if password is URL-encoded
- Verify project reference in URL
- Ensure database is not paused (Supabase)
- Check network connectivity
- Verify correct port (5432 for session, 6543 for transaction)

**2. Supabase Auth Not Working**

**Error:** `Invalid API key`

**Solutions:**
- Verify SUPABASE_URL is correct
- Check SUPABASE_ANON_KEY is valid
- Ensure keys match your project
- Check if auth is enabled in Supabase dashboard

**3. CORS Errors**

**Error:** `CORS policy blocked`

**Solutions:**
- Add frontend URL to CORS_ORIGIN
- Restart backend server
- Check CORS middleware configuration
- Verify origin header in request

**4. Environment Variables Not Loading**

**Error:** `undefined` when accessing env vars

**Solutions:**
- Verify file name is exactly `.env` or `.env.local`
- Restart development server
- Check file is in correct directory
- Use `process.env.VARIABLE_NAME` syntax
- For Next.js: Use `NEXT_PUBLIC_` prefix for client-side

**5. MongoDB Connection Failed**

**Error:** `MongoServerError`

**Solutions:**
- Check username and password
- Verify cluster URL
- Check IP whitelist (allow 0.0.0.0/0 for dev)
- Ensure network access is enabled
- Verify database name

---

## Environment Variable Checklist

### Before Starting Development

- [ ] Backend .env file created
- [ ] Web .env.local file created
- [ ] Admin .env.local file created
- [ ] Vendor .env.local file created
- [ ] Prisma .env file created
- [ ] All passwords URL-encoded
- [ ] Supabase credentials added
- [ ] MongoDB connection string added
- [ ] JWT secret generated (32+ chars)
- [ ] CORS origins configured
- [ ] API URLs point to correct hosts
- [ ] All .env files in .gitignore

### Before Deploying to Production

- [ ] Generate new production secrets
- [ ] Use production database
- [ ] Use production Supabase project
- [ ] Use live payment gateway keys
- [ ] Update CORS_ORIGIN with production URLs
- [ ] Set NODE_ENV=production
- [ ] Configure custom domain
- [ ] Setup SSL certificates
- [ ] Enable production logging
- [ ] Test all integrations

---

## Quick Setup Script

```bash
#!/bin/bash
# Quick environment setup script

echo "Setting up ONE MEDI environment..."

# Backend
cp apps/backend/.env.example apps/backend/.env
echo "✅ Backend .env created"

# Frontend apps
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local
cp apps/vendor/.env.example apps/vendor/.env.local
echo "✅ Frontend .env files created"

# Prisma
cp packages/prisma/.env.example packages/prisma/.env
echo "✅ Prisma .env created"

echo ""
echo "⚠️  Important: Edit all .env files with your actual credentials"
echo "See ENV_SETUP.md for detailed instructions"
```

---

## Current Configuration (Development)

### Active Services

| Service | Port | Environment | Status |
|---------|------|-------------|--------|
| Backend API | 8001 | Development | 🟢 Running |
| Customer App | 3000 | Development | 🟢 Running |
| Admin Dashboard | 3001 | Development | 🟢 Running |
| Vendor Dashboard | 3002 | Development | 🟢 Running |

### Database Status

| Database | Type | Status | Mode |
|----------|------|--------|------|
| PostgreSQL | Supabase | ⚠️ Configured | Ready |
| MongoDB | Atlas | ⚠️ Configured | Ready |
| Current | Mock Data | 🟢 Active | Development |

**Note:** Currently using **mock data** for rapid development. Switch to real databases by activating Supabase and running `pnpm db:push`.

---

## Testing Environment Configuration

### Verify Backend Configuration

```bash
# Test backend is reading environment variables
curl http://localhost:8001/api/v1/health

# Expected response:
{
  "success": true,
  "environment": "development",
  "database": {
    "postgresql": "pending",
    "mongodb": "mock-data"
  }
}
```

### Verify Frontend Configuration

```bash
# Open browser console on http://localhost:3000
# Run:
console.log(process.env.NEXT_PUBLIC_API_URL)

# Expected output:
http://localhost:8001/api/v1
```

### Verify Database Connection (When Active)

```bash
# Test PostgreSQL connection
cd packages/prisma
npx prisma db push

# Expected: Tables created successfully

# Test MongoDB connection
# Check backend logs when starting:
# Should see: "✅ MongoDB connected"
```

---

## Summary

Environment variables are crucial for:
- Separating configuration from code
- Supporting multiple environments
- Securing sensitive credentials
- Enabling different integrations per environment

Always use `.env.example` files as templates and create your own `.env` files with actual values. Never commit real credentials to version control.

---

**For more details, see:**
- PROJECT_SUMMARY.md (Complete guide)
- ARCHITECTURE.md (System architecture)
- README.md (Quick start)

---

**Document Version:** 2.0  
**Last Updated:** Phase 4 Completion
