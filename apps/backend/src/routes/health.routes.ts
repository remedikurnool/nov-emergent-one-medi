import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      message: 'ONE MEDI API is healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        postgresql: 'pending',
        mongodb: 'mock-data',
      },
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Service unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
