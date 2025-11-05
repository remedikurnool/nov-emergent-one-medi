'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/store/cart-store';
import { AppLayout } from '@/components/app-layout';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();

  const subtotal = getTotalPrice();
  const deliveryCharge = subtotal >= 500 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryCharge + tax;

  if (items.length === 0) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-2xl text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Add medicines and lab tests to get started</p>
          <Link
            href="/medicines"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Browse Medicines
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart ({getTotalItems()} items)</h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 text-sm font-medium"
            data-testid="clear-cart-btn"
          >
            Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
                data-testid={`cart-item-${item.id}`}
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">💊</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-base md:text-lg text-gray-900 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.unit}</p>
                        {item.requiresPrescription && (
                          <span className="inline-block bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">
                            RX Required
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600 p-2"
                        data-testid={`remove-${item.id}`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
                          data-testid={`decrease-${item.id}`}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
                          data-testid={`increase-${item.id}`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">₹{item.price} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery Charge</span>
                  <span className="font-semibold">
                    {deliveryCharge === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${deliveryCharge.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (5%)</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {subtotal < 500 && (
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-4">
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    Add ₹{(500 - subtotal).toFixed(2)} more for FREE delivery!
                  </p>
                </div>
              )}

              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors mb-3"
                data-testid="proceed-checkout-btn"
              >
                Proceed to Checkout
              </button>
              
              <Link href="/medicines" className="block text-center text-primary hover:underline text-sm">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
