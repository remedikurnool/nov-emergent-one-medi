'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface RazorpayOptions {
  amount: number;
  currency?: string;
  name: string;
  description?: string;
  orderId: string;
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

export function useRazorpay() {
  const [loaded, setLoaded] = useState(false);
  const [razorpayKey, setRazorpayKey] = useState<string>('');

  useEffect(() => {
    // Load Razorpay key from backend
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/key`)
      .then((res) => res.json())
      .then((data) => {
        setRazorpayKey(data.key);
      })
      .catch(console.error);
  }, []);

  const openRazorpay = (options: RazorpayOptions) => {
    if (!loaded) {
      alert('Payment gateway is loading. Please try again.');
      return;
    }

    const rzpOptions = {
      key: razorpayKey,
      amount: Math.round(options.amount * 100), // Convert to paise
      currency: options.currency || 'INR',
      name: options.name,
      description: options.description || 'Order Payment',
      order_id: options.orderId,
      handler: function (response: any) {
        options.onSuccess(response);
      },
      prefill: options.prefill || {},
      theme: {
        color: '#14b8a6', // Primary teal color
      },
      modal: {
        ondismiss: function () {
          options.onFailure({ reason: 'Payment cancelled by user' });
        },
      },
    };

    const rzp = new (window as any).Razorpay(rzpOptions);
    rzp.open();
  };

  return {
    loaded,
    setLoaded,
    openRazorpay,
    razorpayKey,
  };
}

interface RazorpayScriptProps {
  onLoad: () => void;
}

export function RazorpayScript({ onLoad }: RazorpayScriptProps) {
  return (
    <Script
      src="https://checkout.razorpay.com/v1/checkout.js"
      onLoad={onLoad}
      strategy="lazyOnload"
    />
  );
}
