'use client';

import { Bell, Search, User } from 'lucide-react';

export function VendorHeader() {
  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Vendor Dashboard</h2>
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="hidden md:inline font-medium">Vendor</span>
          </div>
        </div>
      </div>
    </header>
  );
}
