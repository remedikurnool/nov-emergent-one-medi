'use client';

import { TrendingUp, DollarSign, ShoppingCart, Users, Package, Calendar } from 'lucide-react';
import { AdminLayout } from '@/components/admin-layout';

export default function AnalyticsPage() {
  const salesData = [
    { month: 'Jan', revenue: 45000, orders: 234 },
    { month: 'Feb', revenue: 52000, orders: 267 },
    { month: 'Mar', revenue: 48000, orders: 245 },
    { month: 'Apr', revenue: 61000, orders: 312 },
    { month: 'May', revenue: 55000, orders: 289 },
    { month: 'Jun', revenue: 67000, orders: 345 },
  ];

  const topProducts = [
    { name: 'Dolo 650', sales: 1234, revenue: 37020 },
    { name: 'Combiflam', sales: 987, revenue: 41948 },
    { name: 'Crocin', sales: 856, revenue: 23968 },
  ];

  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics & Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Insights and performance metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Revenue', value: '₹3,28,000', icon: DollarSign, color: 'bg-green-500' },
            { label: 'Total Orders', value: '1,692', icon: ShoppingCart, color: 'bg-blue-500' },
            { label: 'Products Sold', value: '4,234', icon: Package, color: 'bg-purple-500' },
            { label: 'Active Users', value: '3,421', icon: Users, color: 'bg-orange-500' },
          ].map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className={`${metric.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-500 text-sm mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Monthly Revenue</h3>
            <div className="space-y-3">
              {salesData.map((data) => (
                <div key={data.month}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{data.month}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">₹{data.revenue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${(data.revenue / 70000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Top Selling Products</h3>
            <div className="space-y-4">
              {topProducts.map((product, idx) => (
                <div key={product.name} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} units sold</p>
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white">₹{product.revenue.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
