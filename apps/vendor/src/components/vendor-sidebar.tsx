'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3,
  Warehouse,
  Settings,
  Menu,
  X
} from 'lucide-react';

export function VendorSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/products', icon: Package, label: 'My Products' },
    { href: '/orders', icon: ShoppingCart, label: 'Orders' },
    { href: '/inventory', icon: Warehouse, label: 'Inventory' },
    { href: '/revenue', icon: BarChart3, label: 'Revenue' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        {collapsed ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
      </button>

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all z-40 ${
          collapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64'
        }`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">OM</span>
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ONE MEDI
                </h2>
                <p className="text-xs text-gray-500">Vendor Panel</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {!collapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
