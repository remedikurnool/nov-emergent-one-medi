'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Eye } from 'lucide-react';
import { AdminLayout } from '@/components/admin-layout';

interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  total: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock orders data
    const mockOrders = [
      { id: '1', orderNumber: 'OM1730987654321', userId: 'user-1', total: 450.50, status: 'DELIVERED', createdAt: '2025-11-01' },
      { id: '2', orderNumber: 'OM1730987654322', userId: 'user-2', total: 1299.00, status: 'PROCESSING', createdAt: '2025-11-03' },
      { id: '3', orderNumber: 'OM1730987654323', userId: 'user-3', total: 195.00, status: 'PENDING', createdAt: '2025-11-04' },
    ];
    setOrders(mockOrders);
    setLoading(false);
  }, []);

  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Orders Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track all customer orders</p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg">
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-6 py-4 font-mono text-sm font-semibold text-gray-900 dark:text-white">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    User #{order.userId}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                    ₹{order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      className={`px-3 py-1 rounded-lg text-sm font-semibold border-2 ${
                        order.status === 'DELIVERED' ? 'border-green-200 bg-green-100 text-green-800' :
                        order.status === 'PROCESSING' ? 'border-blue-200 bg-blue-100 text-blue-800' :
                        'border-orange-200 bg-orange-100 text-orange-800'
                      }`}
                      defaultValue={order.status}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
