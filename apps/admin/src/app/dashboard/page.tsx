'use client';

import { TrendingUp, ShoppingCart, Package, Users, DollarSign, Activity } from 'lucide-react';
import { AdminLayout } from '@/components/admin-layout';

export default function DashboardPage() {
  const stats = [
    { label: 'Total Revenue', value: '₹1,24,580', change: '+12.5%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Total Orders', value: '1,247', change: '+8.2%', icon: ShoppingCart, color: 'bg-blue-500' },
    { label: 'Products', value: '456', change: '+23', icon: Package, color: 'bg-purple-500' },
    { label: 'Active Users', value: '3,421', change: '+15.3%', icon: Users, color: 'bg-orange-500' },
  ];

  const recentOrders = [
    { id: 'OM001', customer: 'Rajesh Kumar', total: 450, status: 'Delivered', date: '2 hrs ago' },
    { id: 'OM002', customer: 'Priya Sharma', total: 1299, status: 'Processing', date: '4 hrs ago' },
    { id: 'OM003', customer: 'Amit Patel', total: 195, status: 'Pending', date: '6 hrs ago' },
  ];

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Orders</h2>
              <button className="text-primary font-semibold text-sm hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">₹{order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Stats</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Orders Today</span>
                  <span className="font-bold text-gray-900 dark:text-white">24</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Revenue Today</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹12,450</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">New Users</span>
                  <span className="font-bold text-gray-900 dark:text-white">8</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
