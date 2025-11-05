'use client';

import { VendorSidebar } from '@/components/vendor-sidebar';
import { VendorHeader } from '@/components/vendor-header';

export function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <VendorSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <VendorHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
