'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ShoppingCart, Menu, User, LogOut } from 'lucide-react';
import { useCart } from '@/lib/store/cart-store';
import { useAuth } from '@/lib/auth-provider';
import { AuthModal } from './auth-modal';

export function Header() {
  const router = useRouter();
  const cartItems = useCart((state) => state.getTotalItems());
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">OM</span>
              </div>
              <span className="font-bold text-lg md:text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ONE MEDI
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-gray-500">Deliver to</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Kurnool, 518001</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4">
              {/* Auth - Desktop */}
              {user ? (
                <div className="hidden lg:flex items-center gap-3">
                  <Link href="/profile" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.user_metadata?.first_name || 'Profile'}
                    </span>
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    data-testid="logout-btn"
                  >
                    <LogOut className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="px-4 py-2 text-primary font-semibold hover:bg-primary/10 rounded-lg transition-colors"
                    data-testid="login-btn"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                    data-testid="signup-btn"
                  >
                    Sign Up
                  </button>
                </div>
              )}
              
              {/* Cart */}
              <Link href="/cart" className="relative" data-testid="cart-button">
                <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartItems}
                  </span>
                )}
              </Link>
              
              {/* Menu - Mobile Only */}
              <button className="md:hidden" data-testid="menu-button">
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
}
