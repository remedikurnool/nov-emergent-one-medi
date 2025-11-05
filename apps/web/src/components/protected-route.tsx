'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-provider';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      // Store the intended destination
      localStorage.setItem('redirectAfterLogin', pathname);
      setShowAuth(true);
    }
  }, [user, loading, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Login Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Please login to access this page</p>
          <button
            onClick={() => router.push('/')}
            className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary/90"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
