'use client';

import Link from 'next/link';
import { Package, ChevronRight } from 'lucide-react';
import { useAuth } from '@/lib/auth-provider';
import { ProtectedRoute } from '@/components/protected-route';
import { AppLayout } from '@/components/app-layout';

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  );
}

function OrdersContent() {
  const mockOrders = [
    {
      id: '1',
      orderNumber: 'OM1730987654321',
      date: '2025-11-01',
      total: 450.50,
      status: 'Delivered',
      items: 3,
      products: ['Dolo 650', 'Combiflam', 'Crocin'],
    },
    {
      id: '2',
      orderNumber: 'OM1730987654322',
      date: '2025-11-03',
      total: 1299.00,
      status: 'In Transit',
      items: 1,
      products: ['Accu-Chek Glucometer'],
    },
    {
      id: '3',
      orderNumber: 'OM1730987654323',
      date: '2025-11-04',
      total: 195.00,
      status: 'Processing',
      items: 1,
      products: ['Volini Gel'],
    },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">My Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your orders</p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900 dark:text-white">
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {order.items} {order.items === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-start md:items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === 'Delivered'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : order.status === 'In Transit'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
                  }`}>
                    {order.status}
                  </span>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ₹{order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {order.products.join(', ')}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/orders/${order.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Track Order
                  <ChevronRight className="w-4 h-4" />
                </Link>
                {order.status === 'Delivered' && (
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold">
                    Reorder
                  </button>
                )}
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold">
                  Get Invoice
                </button>
              </div>
            </div>
          ))}
        </div>

        {mockOrders.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No orders yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start shopping to see your orders here</p>
            <Link
              href="/medicines"
              className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary/90"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
