import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error-handler';
import healthRoutes from './routes/health.routes';
import productRoutes from './routes/product.routes';
import labTestRoutes from './routes/labtest.routes';
import orderRoutes from './routes/order.routes';
import paymentRoutes from './routes/payment.routes';
import bookingRoutes from './routes/booking.routes';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8001;
const API_VERSION = process.env.API_VERSION || 'v1';
const API_PREFIX = process.env.API_PREFIX || '/api';

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Compression
app.use(compression());

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// API Routes
app.use(`${API_PREFIX}/${API_VERSION}/health`, healthRoutes);
app.use(`${API_PREFIX}/${API_VERSION}/products`, productRoutes);
app.use(`${API_PREFIX}/${API_VERSION}/lab-tests`, labTestRoutes);
app.use(`${API_PREFIX}/${API_VERSION}/orders`, orderRoutes);
app.use(`${API_PREFIX}/${API_VERSION}/payment`, paymentRoutes);
app.use(`${API_PREFIX}/${API_VERSION}/bookings`, bookingRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'ONE MEDI API Server',
    version: API_VERSION,
    timestamp: new Date().toISOString(),
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
});

// Error Handler
app.use(errorHandler);

// Database connections and server start
const startServer = async () => {
  try {
    // MongoDB connection temporarily disabled - using mock data
    // await connectMongoDB();
    console.log('⚠️  Using mock data (MongoDB connection disabled for now)');

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 ONE MEDI Backend Server running on port ${PORT}`);
      console.log(`📍 API Base URL: http://localhost:${PORT}${API_PREFIX}/${API_VERSION}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📊 Mock Data: 6 products, 5 lab tests loaded`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
