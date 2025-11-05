'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, MapPin, CreditCard, User as UserIcon, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '@/lib/auth-provider';
import { ProtectedRoute } from '@/components/protected-route';
import { AppLayout } from '@/components/app-layout';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');

  const mockOrders = [
    {
      id: '1',
      orderNumber: 'OM1234567890',
      date: '2025-11-01',
      total: 450.50,
      status: 'Delivered',
      items: 3,
    },
    {
      id: '2',
      orderNumber: 'OM1234567891',
      date: '2025-11-03',
      total: 1299.00,
      status: 'In Transit',
      items: 1,
    },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 md:p-8 text-white mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
              👤
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
              </h1>
              <p className="text-white/80">{user?.email}</p>
              {user?.user_metadata?.phone && (
                <p className="text-white/80">+91 {user.user_metadata.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'profile', label: 'Profile', icon: UserIcon },
            { id: 'orders', label: 'Orders', icon: Package },
            { id: 'addresses', label: 'Addresses', icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Personal Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Name</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{user?.email}</p>
                </div>
                {user?.user_metadata?.phone && (
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-semibold text-gray-900 dark:text-white">+91 {user.user_metadata.phone}</p>
                  </div>
                )}
              </div>
              <button className="w-full mt-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold">
                Edit Profile
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Account Settings</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white">Change Password</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white">Notification Settings</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  onClick={signOut}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-red-600 font-semibold"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="font-semibold text-lg text-gray-900 dark:text-white">
                      Order #{order.orderNumber}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Placed on {new Date(order.date).toLocaleDateString('en-IN')}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {order.items} items | ₹{order.total.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                    }`}>
                      {order.status}
                    </span>
                    <Link
                      href={`/orders/${order.id}`}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {mockOrders.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No orders yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Start shopping to see your orders here</p>
                <Link
                  href="/medicines"
                  className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary/90"
                >
                  Browse Medicines
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">Address management coming soon...</p>
              <button className="mt-4 bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-primary/90">
                Add New Address
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
