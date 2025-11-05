'use client';

import Link from 'next/link';
import { CheckCircle, Package, Home } from 'lucide-react';
import { AppLayout } from '@/components/app-layout';

export default function OrderSuccessPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Thank you for your order. We'll deliver it soon!
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-8 text-left">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Order Number</p>
                <p className="font-semibold text-gray-900 dark:text-white">OM{Date.now()}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Estimated Delivery</p>
                <p className="font-semibold text-gray-900 dark:text-white">2-3 days</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/orders"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Package className="w-5 h-5" />
              Track Order
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
