'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, MapPin } from 'lucide-react';
import { api } from '@/lib/api';
import { AppLayout } from '@/components/app-layout';

interface LabTest {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  parameters: string[];
  preparation: string;
  reportTime: string;
  isPopular: boolean;
}

export default function LabTestsPage() {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadLabTests() {
      try {
        const res = await api.labTests.getAll({ limit: '50' });
        setLabTests(res.data || []);
      } catch (error) {
        console.error('Failed to load lab tests:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadLabTests();
  }, []);

  const filteredTests = labTests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Lab Tests</h1>
          <p className="text-gray-600 dark:text-gray-400">Book lab tests with home collection facility</p>
        </div>

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search lab tests"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800"
              data-testid="lab-test-search-input"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Home Collection Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 p-6 rounded-xl border-2 border-primary/20 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-3xl">
              🏠
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary dark:text-teal-300 mb-1">Home Collection Available</h3>
              <p className="text-gray-700 dark:text-gray-300">Book tests and get samples collected from home | Up to 50% OFF</p>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {filteredTests.length} {filteredTests.length === 1 ? 'test' : 'tests'} available
        </p>

        {/* Lab Tests Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTests.map((test) => (
              <Link
                key={test.id}
                href={`/lab-tests/${test.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-5 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group"
                data-testid={`lab-test-${test.id}`}
              >
                {/* Icon */}
                <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-4 flex justify-center items-center h-24 mb-3 relative group-hover:bg-primary/20 transition-colors">
                  <span className="text-5xl">🧪</span>
                  {test.isPopular && (
                    <div className="absolute top-0 left-0 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-br-lg rounded-tl-xl">
                      POPULAR
                    </div>
                  )}
                </div>

                {/* Test Info */}
                <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-1">{test.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{test.category}</p>

                {/* Parameters */}
                <div className="mb-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Includes {test.parameters.length} parameters</p>
                  <div className="flex flex-wrap gap-1">
                    {test.parameters.slice(0, 3).map((param, idx) => (
                      <span key={idx} className="text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-400">
                        {param}
                      </span>
                    ))}
                    {test.parameters.length > 3 && (
                      <span className="text-[10px] text-gray-500">+{test.parameters.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Report Time */}
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  ⏱️ Report: {test.reportTime}
                </p>

                {/* Price & Book */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                  <p className="font-bold text-xl text-gray-900 dark:text-white">₹{test.price.toFixed(0)}</p>
                  <button 
                    className="bg-primary/20 text-primary font-bold px-4 py-2 rounded-lg text-sm hover:bg-primary hover:text-white transition-all"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    data-testid={`book-test-${test.id}`}
                  >
                    Book Now
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredTests.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tests found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try different search terms</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
