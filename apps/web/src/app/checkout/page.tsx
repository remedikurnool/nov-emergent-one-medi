'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Plus, Check, CreditCard, Wallet, Truck, Smartphone } from 'lucide-react';
import { useCart } from '@/lib/store/cart-store';
import { useAuth } from '@/lib/auth-provider';
import { ProtectedRoute } from '@/components/protected-route';
import { AppLayout } from '@/components/app-layout';
import { api } from '@/lib/api';
import { useRazorpay, RazorpayScript } from '@/lib/use-razorpay';

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, getTotalPrice, clearCart } = useCart();
  const { loaded, setLoaded, openRazorpay } = useRazorpay();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD' | 'UPI'>('COD');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [placing, setPlacing] = useState(false);

  // Address form state
  const [addressForm, setAddressForm] = useState({
    type: 'HOME' as 'HOME' | 'WORK' | 'OTHER',
    fullName: user?.user_metadata?.first_name + ' ' + user?.user_metadata?.last_name || '',
    phone: user?.user_metadata?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: 'Kurnool',
    state: 'Andhra Pradesh',
    pincode: '',
    isDefault: false,
  });

  const [savedAddresses, setSavedAddresses] = useState<any[]>([
    {
      id: 'addr-1',
      type: 'HOME',
      fullName: 'Demo User',
      phone: '9876543210',
      addressLine1: '123 Main Street',
      addressLine2: 'Near City Mall',
      city: 'Kurnool',
      state: 'Andhra Pradesh',
      pincode: '518001',
      isDefault: true,
    },
  ]);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
    // Auto-select default address
    const defaultAddr = savedAddresses.find((a) => a.isDefault);
    if (defaultAddr) {
      setSelectedAddress(defaultAddr.id);
    }
  }, [items, router, savedAddresses]);

  const subtotal = getTotalPrice();
  const deliveryCharge = subtotal >= 500 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryCharge + tax;

  const handleAddAddress = () => {
    const newAddress = {
      id: `addr-${Date.now()}`,
      ...addressForm,
    };
    setSavedAddresses([...savedAddresses, newAddress]);
    setSelectedAddress(newAddress.id);
    setShowAddressForm(false);
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const orderData = {
        userId: user?.id || 'demo-user',
        addressId: selectedAddress,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        paymentMethod,
        subtotal,
        deliveryCharge,
        tax,
        total,
      };

      // If online payment, initiate Razorpay
      if (paymentMethod === 'CARD' || paymentMethod === 'UPI') {
        // Create Razorpay order
        const paymentOrderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: total }),
        });
        const paymentOrderData = await paymentOrderRes.json();

        if (!paymentOrderData.success) {
          throw new Error('Failed to create payment order');
        }

        // Open Razorpay checkout
        openRazorpay({
          amount: total,
          orderId: paymentOrderData.data.id,
          name: 'ONE MEDI',
          description: `Order for ${items.length} items`,
          prefill: {
            name: user?.user_metadata?.first_name + ' ' + user?.user_metadata?.last_name,
            email: user?.email,
            contact: user?.user_metadata?.phone,
          },
          onSuccess: async (response) => {
            // Verify payment on backend
            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: paymentOrderData.data.id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              // In future: await api.orders.create(orderData);
              clearCart();
              router.push('/orders/success');
            } else {
              alert('Payment verification failed');
            }
          },
          onFailure: (error) => {
            console.error('Payment failed:', error);
            alert('Payment failed. Please try again.');
            setPlacing(false);
          },
        });
        setPlacing(false);
      } else {
        // COD - direct order placement
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // In future: await api.orders.create(orderData);
        clearCart();
        router.push('/orders/success');
      }
    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Failed to place order. Please try again.');
      setPlacing(false);
    }
  };

  return (
    <AppLayout>
      <RazorpayScript onLoad={() => setLoaded(true)} />
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s, idx) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {idx < 2 && (
                <div className={`w-20 md:w-32 h-1 ${
                  step > s ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Delivery Address */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Delivery Address
                </h2>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="flex items-center gap-1 text-primary font-semibold text-sm hover:underline"
                  data-testid="add-address-btn"
                >
                  <Plus className="w-4 h-4" />
                  Add New
                </button>
              </div>

              {/* Saved Addresses */}
              <div className="space-y-3 mb-4">
                {savedAddresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedAddress === addr.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                    data-testid={`address-${addr.id}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 dark:text-white">{addr.fullName}</span>
                          <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 px-2 py-0.5 rounded">
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {addr.addressLine1}, {addr.addressLine2}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Phone: {addr.phone}
                        </p>
                      </div>
                      {selectedAddress === addr.id && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Add Address Form */}
              {showAddressForm && (
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Add New Address</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={addressForm.fullName}
                      onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                      className="col-span-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="col-span-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Address Line 1"
                      value={addressForm.addressLine1}
                      onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                      className="col-span-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Address Line 2 (Optional)"
                      value={addressForm.addressLine2}
                      onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })}
                      className="col-span-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={addressForm.pincode}
                      onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      pattern="[1-9][0-9]{5}"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddAddress}
                      className="flex-1 bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/90"
                    >
                      Save Address
                    </button>
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedAddress}
                  className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed mt-4"
                >
                  Continue to Payment
                </button>
              )}
            </div>

            {/* Step 2: Payment Method */}
            {step >= 2 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {[
                    { id: 'COD', label: 'Cash on Delivery', icon: Truck, desc: 'Pay when you receive' },
                    { id: 'UPI', label: 'UPI Payment', icon: Wallet, desc: 'Google Pay, PhonePe, Paytm' },
                    { id: 'CARD', label: 'Card Payment', icon: CreditCard, desc: 'Credit/Debit cards' },
                  ].map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                          paymentMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                        }`}
                        data-testid={`payment-${method.id.toLowerCase()}`}
                      >
                        <Icon className="w-6 h-6 text-primary" />
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-gray-900 dark:text-white">{method.label}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{method.desc}</p>
                        </div>
                        {paymentMethod === method.id && (
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {step === 2 && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90"
                    >
                      Review Order
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Review & Place Order */}
            {step >= 3 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Review Order</h2>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        💊
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity} | {item.unit}</p>
                        <p className="font-bold text-primary">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                    disabled={placing}
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 disabled:bg-gray-300"
                    data-testid="place-order-btn"
                  >
                    {placing ? 'Placing Order...' : `Place Order (₹${total.toFixed(2)})`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery</span>
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

              {/* Selected Info */}
              {step >= 2 && selectedAddress && (
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 pt-4 border-t">
                  <p>📍 {savedAddresses.find((a) => a.id === selectedAddress)?.city}</p>
                  <p>💳 {paymentMethod === 'COD' ? 'Cash on Delivery' : paymentMethod}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
