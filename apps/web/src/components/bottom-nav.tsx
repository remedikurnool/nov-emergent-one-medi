'use client';

import Link from 'next/link';
import { Home, Pill, TestTube2, Stethoscope, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/medicines', label: 'Medicines', icon: Pill },
    { href: '/lab-tests', label: 'Tests', icon: TestTube2 },
    { href: '/doctors', label: 'Doctors', icon: Stethoscope },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-2 z-50 shadow-lg">
      <div className="container mx-auto px-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center min-w-[60px] py-1 transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-gray-500 dark:text-gray-400 hover:text-primary'
                }`}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
