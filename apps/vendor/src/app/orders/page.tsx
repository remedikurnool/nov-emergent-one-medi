'use client';

import { VendorLayout } from '@/components/vendor-layout';
import { Eye, Package as PackageIcon } from 'lucide-react';

export default function VendorOrdersPage() {
  const orders = [
    { id: 'OM001', customer: 'Rajesh K.', product: 'Dolo 650', qty: 5, total: 150, status: 'Processing', date: '2025-11-04' },
    { id: 'OM002', customer: 'Priya S.', product: 'Combiflam', qty: 3, total: 127.50, status: 'Pending', date: '2025-11-04' },
    { id: 'OM003', customer: 'Amit P.', product: 'Volini Gel', qty: 2, total: 390, status: 'Shipped', date: '2025-11-03' },
  ];

  return (
    <VendorLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage customer orders for your products</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-6 py-4">
                    <p className="font-mono font-semibold text-gray-900 dark:text-white">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{order.customer}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.product}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{order.qty}</td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">₹{order.total}</td>
                  <td className="px-6 py-4">
                    <select className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      order.status === 'Shipped' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </VendorLayout>
  );
}
