'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Upload, ChevronRight } from 'lucide-react';
import { api } from '@/lib/api';
import { useCart } from '@/lib/store/cart-store';
import { AppLayout } from '@/components/app-layout';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  requiresPrescription: boolean;
  discount?: number;
}

interface LabTest {
  id: string;
  name: string;
  price: number;
  category: string;
  isPopular: boolean;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCart((state) => state.addItem);
  const cartItems = useCart((state) => state.getTotalItems());

  useEffect(() => {
    async function loadData() {
      try {
        const [productsRes, labTestsRes] = await Promise.all([
          api.products.getAll({ limit: '8' }),
          api.labTests.getAll({ limit: '6' }),
        ]);
        
        setProducts(productsRes.data || []);
        setLabTests(labTestsRes.data || []);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  return (
    <AppLayout>
      <div className="w-full">
        {/* Hero Section - Desktop Only */}
        <div className="hidden lg:block bg-gradient-to-r from-primary/10 via-purple-50 to-primary/10 dark:from-primary/5 dark:via-purple-900/10 dark:to-primary/5 py-12 mb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                  Welcome to ONE MEDI
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  Your trusted healthcare partner in Kurnool
                </p>
                <div className="flex gap-4">
                  <Link href="/medicines" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    Order Medicines
                  </Link>
                  <Link href="/lab-tests" className="bg-white dark:bg-gray-800 border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                    Book Lab Tests
                  </Link>
                </div>
              </div>
              <div className="hidden xl:block w-96 h-96 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center text-9xl ml-8">
                🏥
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Search Bar */}
          <div className="relative mb-6 max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines, tests, doctors & more"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              data-testid="search-input"
            />
          </div>

          {/* Prescription Upload - Responsive */}
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <hr className="flex-grow border-gray-200 dark:border-gray-700" />
              <span className="px-4 text-sm font-medium text-gray-500 dark:text-gray-400">OR</span>
              <hr className="flex-grow border-gray-200 dark:border-gray-700" />
            </div>
            <button 
              className="w-full bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 p-4 md:p-6 rounded-xl flex items-center justify-between text-left hover:shadow-lg transition-all border-2 border-primary/20"
              data-testid="prescription-upload-btn"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/20 rounded-xl flex items-center justify-center mr-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-primary dark:text-teal-300 tracking-wide">Order with</h2>
                  <p className="text-2xl md:text-4xl font-extrabold text-primary dark:text-teal-300 -mt-1">Prescription</p>
                </div>
              </div>
              <svg className="w-8 h-8 md:w-10 md:h-10 text-primary dark:text-teal-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14l5-5 5 5z" />
              </svg>
            </button>
          </div>

          {/* Promotional Banners - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-4xl mx-auto">
            {/* Trusted Brand */}
            <div className="bg-gradient-to-r from-teal-50 to-purple-50 dark:from-teal-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-teal-100 dark:border-teal-900">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">Trusted Pharmacy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Health to your doorstep</p>
                  <button className="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow text-sm hover:bg-primary/90 transition-colors" data-testid="order-now-btn">
                    ORDER NOW
                  </button>
                </div>
                <div className="text-5xl ml-4">💊</div>
              </div>
            </div>
            
            {/* 40% OFF */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 flex items-center justify-between text-white shadow-lg">
              <div>
                <h3 className="text-3xl font-bold mb-1">Get 40% OFF</h3>
                <p className="text-sm opacity-90">On first medicine order</p>
              </div>
              <div className="text-5xl">🎁</div>
            </div>
          </div>

          {/* Health Concerns - Responsive */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-8 max-w-4xl mx-auto">
            <Link href="/diabetes-care" className="bg-orange-100 dark:bg-orange-900/40 rounded-xl p-3 md:p-4 text-center hover:shadow-md transition-all" data-testid="category-diabetes">
              <div className="text-3xl md:text-4xl mb-2">🩸</div>
              <h3 className="font-semibold text-sm md:text-base text-orange-800 dark:text-orange-200">Diabetes</h3>
            </Link>
            <Link href="/medicines" className="bg-cyan-100 dark:bg-cyan-900/40 rounded-xl p-3 md:p-4 text-center hover:shadow-md transition-all" data-testid="category-fever">
              <div className="text-3xl md:text-4xl mb-2">🌡️</div>
              <h3 className="font-semibold text-sm md:text-base text-cyan-800 dark:text-cyan-200">Fever</h3>
            </Link>
            <Link href="/surgery-opinion" className="bg-purple-100 dark:bg-purple-900/40 rounded-xl p-3 md:p-4 text-center hover:shadow-md transition-all" data-testid="category-surgery">
              <div className="text-3xl md:text-4xl mb-2">⚕️</div>
              <h3 className="font-semibold text-sm md:text-base text-purple-800 dark:text-purple-200">Surgery</h3>
            </Link>
            <Link href="/home-nursing-care" className="bg-pink-100 dark:bg-pink-900/40 rounded-xl p-3 md:p-4 text-center hover:shadow-md transition-all">
              <div className="text-3xl md:text-4xl mb-2">🏥</div>
              <h3 className="font-semibold text-sm md:text-base text-pink-800 dark:text-pink-200">Nursing</h3>
            </Link>
            <Link href="/physiotherapy" className="bg-green-100 dark:bg-green-900/40 rounded-xl p-3 md:p-4 text-center hover:shadow-md transition-all">
              <div className="text-3xl md:text-4xl mb-2">🧘</div>
              <h3 className="font-semibold text-sm md:text-base text-green-800 dark:text-green-200">Physio</h3>
            </Link>
            <Link href="/ambulance" className="bg-red-100 dark:bg-red-900/40 rounded-xl p-3 md:p-4 text-center hover:shadow-md transition-all">
              <div className="text-3xl md:text-4xl mb-2">🚑</div>
              <h3 className="font-semibold text-sm md:text-base text-red-800 dark:text-red-200">Emergency</h3>
            </Link>
          </div>

          {/* Service Categories - Responsive Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center md:text-left">Healthcare Services</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                { href: '/medicines', icon: '💊', label: 'Medicines', testId: 'service-medicines' },
                { href: '/lab-tests', icon: '🧪', label: 'Lab Tests', testId: 'service-lab-tests' },
                { href: '/scans', icon: '📡', label: 'Scans', testId: 'service-scans' },
                { href: '/doctors', icon: '👨‍⚕️', label: 'Doctors', testId: 'service-doctors' },
                { href: '/hospitals', icon: '🏥', label: 'Hospitals', testId: 'service-hospitals' },
                { href: '/home-nursing-care', icon: '🩺', label: 'Home Care', testId: 'service-home-care' },
                { href: '/diabetes-care', icon: '🩸', label: 'Diabetes', testId: 'service-diabetes' },
                { href: '/physiotherapy', icon: '🧘', label: 'Physiotherapy', testId: 'service-physio' },
                { href: '/surgery-opinion', icon: '⚕️', label: 'Surgery', testId: 'service-surgery' },
                { href: '/insurance', icon: '🛡️', label: 'Insurance', testId: 'service-insurance' },
              ].map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 text-center hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 hover:scale-105 group"
                  data-testid={service.testId}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <span className="text-3xl md:text-4xl">{service.icon}</span>
                  </div>
                  <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">{service.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Medicines - Responsive */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Medicines</h2>
              <Link href="/medicines" className="text-primary font-semibold text-sm md:text-base hover:underline">View All →</Link>
            </div>
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/medicines/${product.id}`}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-3 md:p-4 space-y-2 relative border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group"
                    data-testid={`product-${product.id}`}
                  >
                    {product.discount && product.discount > 0 && (
                      <div className="absolute top-0 left-0 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-br-lg rounded-tl-xl">
                        {Math.round(product.discount)}% OFF
                      </div>
                    )}
                    {product.requiresPrescription && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        RX
                      </div>
                    )}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 md:p-4 flex justify-center h-24 md:h-32 items-center group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                      <div className="text-4xl md:text-5xl">💊</div>
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 min-h-[40px]">{product.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.unit}</p>
                    <div className="flex justify-between items-center pt-2">
                      <p className="font-bold text-base md:text-lg text-gray-900 dark:text-white">₹{product.price.toFixed(2)}</p>
                      <button 
                        className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addItem({
                            productId: product.id,
                            name: product.name,
                            price: product.price,
                            unit: product.unit,
                            requiresPrescription: product.requiresPrescription,
                          });
                        }}
                        data-testid={`add-to-cart-${product.id}`}
                      >
                        <span className="text-lg font-bold">+</span>
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Lab Tests at Home Banner - Desktop/Tablet */}
          <div className="hidden md:block mb-8 max-w-4xl mx-auto">
            <Link href="/lab-tests" className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 p-6 rounded-xl flex items-center justify-between hover:shadow-lg transition-all border-2 border-primary/20">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🏠</span>
                </div>
                <div>
                  <p className="text-xl font-bold text-primary dark:text-teal-300">Lab Tests at Home</p>
                  <p className="text-gray-700 dark:text-gray-300">Upto 50% OFF | Book Now</p>
                </div>
              </div>
              <ChevronRight className="w-8 h-8 text-primary dark:text-teal-300" />
            </Link>
          </div>

          {/* Popular Lab Tests - Responsive Grid */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Popular Lab Tests</h2>
              <Link href="/lab-tests" className="text-primary font-semibold text-sm md:text-base hover:underline">View All →</Link>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl h-56 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {labTests.map((test) => (
                  <Link
                    key={test.id}
                    href={`/lab-tests/${test.id}`}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group"
                    data-testid={`lab-test-${test.id}`}
                  >
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-4 flex justify-center items-center h-24 mb-3 relative group-hover:bg-primary/20 transition-colors">
                      <span className="text-5xl">🧪</span>
                      {test.isPopular && (
                        <div className="absolute top-0 left-0 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-br-lg rounded-tl-xl">
                          POPULAR
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-1">{test.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{test.category}</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-lg text-gray-900 dark:text-white">₹{test.price.toFixed(0)}</p>
                      <button 
                        className="bg-primary/20 text-primary font-bold px-4 py-2 rounded-lg text-sm hover:bg-primary hover:text-white transition-all"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        data-testid={`book-test-${test.id}`}
                      >
                        Book
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Scans & Doctors - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Scans */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Top Scans</h2>
                <Link href="/scans" className="text-primary font-semibold text-sm hover:underline">View All →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Ultrasound', 'X-Ray', 'CT Scan'].map((scan, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all">
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-3 flex justify-center items-center h-20 mb-3">
                      <span className="text-4xl">📊</span>
                    </div>
                    <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-1">{scan}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Medical imaging</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-lg text-gray-900 dark:text-white">₹{(600 + idx * 200).toFixed(0)}</p>
                      <button className="bg-primary/20 text-primary font-bold px-4 py-2 rounded-lg text-sm hover:bg-primary hover:text-white transition-all">
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Doctors */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Best Doctors</h2>
                <Link href="/doctors" className="text-primary font-semibold text-sm hover:underline">View All →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[{ name: 'Dr. Meena S.', specialty: 'Cardiologist', fee: 300 },
                  { name: 'Dr. Rajesh K.', specialty: 'Dermatologist', fee: 400 },
                  { name: 'Dr. Priya G.', specialty: 'Pediatrician', fee: 500 }].map((doctor, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl">
                      👨‍⚕️
                    </div>
                    <h3 className="font-semibold text-base text-gray-900 dark:text-white">{doctor.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{doctor.specialty}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Fee from ₹{doctor.fee}</p>
                    <button className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors">
                      Book
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency Ambulance - Full Width */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between mb-8 text-white shadow-xl max-w-4xl mx-auto">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">24/7 Emergency Ambulance</h3>
              <p className="text-lg">Available across Kurnool | Immediate Response</p>
            </div>
            <Link 
              href="/ambulance"
              className="bg-white text-red-600 font-bold py-3 px-8 rounded-lg hover:bg-red-50 transition-colors text-lg shadow-lg"
              data-testid="call-ambulance-btn"
            >
              Call Now 🚨
            </Link>
          </div>

          {/* Trust Badges - Responsive */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8 bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 rounded-xl">
            <div className="flex flex-col items-center space-y-3 text-center">
              <span className="text-5xl text-primary">✔️</span>
              <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">100% Genuine</span>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <span className="text-5xl text-primary">🚚</span>
              <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <span className="text-5xl text-primary">🔒</span>
              <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">Secure Payments</span>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <span className="text-5xl text-primary">💯</span>
              <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">Verified Partners</span>
            </div>
          </div>

          {/* Additional Info - Desktop Only */}
          <div className="hidden lg:grid grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Free Delivery</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">On orders above ₹500</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customer service always available</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hassle-free return policy</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
