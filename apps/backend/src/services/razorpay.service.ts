import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export const razorpayService = {
  // Create Razorpay order
  createOrder: async (amount: number, currency: string = 'INR') => {
    try {
      const order = await razorpay.orders.create({
        amount: Math.round(amount * 100), // Convert to paise
        currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
          platform: 'ONE MEDI',
        },
      });
      return order;
    } catch (error) {
      console.error('Razorpay order creation failed:', error);
      throw error;
    }
  },

  // Verify payment signature
  verifyPayment: (
    orderId: string,
    paymentId: string,
    signature: string
  ): boolean => {
    const crypto = require('crypto');
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    return generatedSignature === signature;
  },

  // Capture payment
  capturePayment: async (paymentId: string, amount: number) => {
    try {
      const payment = await razorpay.payments.capture(
        paymentId,
        Math.round(amount * 100)
      );
      return payment;
    } catch (error) {
      console.error('Payment capture failed:', error);
      throw error;
    }
  },

  // Refund payment
  refundPayment: async (paymentId: string, amount?: number) => {
    try {
      const refund = await razorpay.payments.refund(paymentId, {
        amount: amount ? Math.round(amount * 100) : undefined,
      });
      return refund;
    } catch (error) {
      console.error('Refund failed:', error);
      throw error;
    }
  },
};
