'use client';

import { ReactNode } from 'react';
import { Header } from './header';
import { BottomNav } from './bottom-nav';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-0">
      <Header />
      <main>{children}</main>
      <BottomNav />
    </div>
  );
}
