'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';
import { useDebounce } from '@one-medi/hooks';
import { api } from '@/lib/api';
import { useCart } from '@/lib/store/cart-store';
import { AppLayout } from '@/components/app-layout';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [products, setProducts] = useState<any[]>([]);
  const [labTests, setLabTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'medicines' | 'tests'>('all');
  const addItem = useCart((state) => state.addItem);

  useEffect(() => {
    if (debouncedSearch.length >= 2) {
      searchItems(debouncedSearch);
    } else {
      setProducts([]);
      setLabTests([]);
    }
  }, [debouncedSearch]);

  const searchItems = async (query: string) => {
    setLoading(true);
    try {
      const [productsRes, labTestsRes] = await Promise.all([
        api.products.search(query, { limit: '20' }),
        api.labTests.search(query, { limit: '20' }),
      ]);
      setProducts(productsRes.data || []);
      setLabTests(labTestsRes.data || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalResults = products.length + labTests.length;
  const filteredProducts = activeTab === 'all' || activeTab === 'medicines' ? products : [];
  const filteredTests = activeTab === 'all' || activeTab === 'tests' ? labTests : [];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Search Results</h1>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicines, lab tests..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800"
              autoFocus
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'all', label: `All (${totalResults})` },
            { id: 'medicines', label: `Medicines (${products.length})` },
            { id: 'tests', label: `Lab Tests (${labTests.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Searching...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && debouncedSearch.length >= 2 && totalResults === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try different keywords or browse our categories</p>
            <div className="flex gap-4 justify-center mt-6">
              <Link href="/medicines" className="text-primary hover:underline">Browse Medicines</Link>
              <Link href="/lab-tests" className="text-primary hover:underline">Browse Lab Tests</Link>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && debouncedSearch.length >= 2 && totalResults > 0 && (
          <div className="space-y-8">
            {/* Products */}
            {filteredProducts.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Medicines ({products.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/medicines/${product.id}`}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
                    >
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex justify-center h-24 items-center mb-3">
                        <span className="text-4xl">💊</span>
                      </div>
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-gray-900 dark:text-white">₹{product.price}</p>
                        <button
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
                          className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Lab Tests */}
            {filteredTests.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Lab Tests ({labTests.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredTests.map((test) => (
                    <Link
                      key={test.id}
                      href={`/lab-tests/${test.id}`}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
                    >
                      <div className="bg-primary/10 rounded-lg p-4 flex justify-center h-20 items-center mb-3">
                        <span className="text-4xl">🧪</span>
                      </div>
                      <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-2">
                        {test.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">{test.category}</p>
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-lg text-gray-900 dark:text-white">₹{test.price}</p>
                        <span className="text-primary font-semibold text-sm">Book →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {debouncedSearch.length < 2 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Start Searching</h3>
            <p className="text-gray-600 dark:text-gray-400">Type at least 2 characters to search</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
