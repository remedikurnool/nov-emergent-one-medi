'use client';

import { VendorLayout } from '@/components/vendor-layout';
import { Calendar, DollarSign, TrendingUp } from 'lucide-react';

export default function VendorRevenuePage() {
  const monthlyData = [
    { month: 'January', revenue: 12450, orders: 67 },
    { month: 'February', revenue: 15230, orders: 82 },
    { month: 'March', revenue: 13890, orders: 74 },
    { month: 'April', revenue: 18560, orders: 95 },
    { month: 'May', revenue: 16720, orders: 88 },
    { month: 'June', revenue: 21340, orders: 112 },
  ];

  const totalRevenue = monthlyData.reduce((sum, m) => sum + m.revenue, 0);

  return (
    <VendorLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Revenue Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your earnings and performance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalRevenue.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{monthlyData[monthlyData.length - 1].revenue.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Growth</p>
                <p className="text-2xl font-bold text-green-600">+24%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Monthly Revenue</h2>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">{data.month}</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹{data.revenue.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${(data.revenue / 25000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">{data.orders} orders</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}
