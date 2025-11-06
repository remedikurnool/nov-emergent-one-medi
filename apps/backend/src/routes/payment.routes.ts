import { Router, Request, Response } from 'express';
import { razorpayService } from '../services/razorpay.service';

const router = Router();

// Create Razorpay order
router.post('/create-order', async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount',
      });
    }

    // Check if Razorpay is configured
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      // Return mock order for development
      return res.json({
        success: true,
        data: {
          id: `order_mock_${Date.now()}`,
          amount: Math.round(amount * 100),
          currency: 'INR',
          status: 'created',
        },
        message: 'Mock payment order created (Razorpay not configured)',
      });
    }

    const order = await razorpayService.createOrder(amount);

    res.json({
      success: true,
      data: order,
      message: 'Payment order created successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create payment order',
    });
  }
});

// Verify payment
router.post('/verify-payment', async (req: Request, res: Response) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Mock verification if Razorpay not configured
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.json({
        success: true,
        verified: true,
        message: 'Mock payment verified (Razorpay not configured)',
      });
    }

    const isValid = razorpayService.verifyPayment(orderId, paymentId, signature);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      });
    }

    res.json({
      success: true,
      verified: true,
      message: 'Payment verified successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Payment verification failed',
    });
  }
});

// Get Razorpay key for frontend
router.get('/key', (req: Request, res: Response) => {
  res.json({
    success: true,
    key: process.env.RAZORPAY_KEY_ID || 'mock_key_for_development',
  });
});

export default router;
