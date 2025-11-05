'use client';

import { Bell, Search, User } from 'lucide-react';

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, orders, users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-6">
          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="hidden md:inline font-medium text-gray-900 dark:text-white">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
