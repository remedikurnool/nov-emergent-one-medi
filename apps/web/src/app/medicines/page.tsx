'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Grid, List } from 'lucide-react';
import { api } from '@/lib/api';
import { useCart } from '@/lib/store/cart-store';
import { AppLayout } from '@/components/app-layout';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp: number;
  unit: string;
  brand: string;
  category: string;
  requiresPrescription: boolean;
  discount?: number;
  stock: number;
}

export default function MedicinesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const addItem = useCart((state) => state.addItem);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await api.products.getAll({ limit: '50' });
        setProducts(res.data || []);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      requiresPrescription: product.requiresPrescription,
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Medicines</h1>
          <p className="text-gray-600 dark:text-gray-400">Browse and order medicines online</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines by name or brand"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800"
              data-testid="medicine-search-input"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </p>

        {/* Products Grid/List */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl h-72 animate-pulse"></div>
            ))}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/medicines/${product.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 space-y-2 relative border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group"
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
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex justify-center h-32 items-center group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                  <div className="text-5xl">💊</div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 min-h-[40px]">{product.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{product.unit}</p>
                <div className="flex justify-between items-center pt-2">
                  <p className="font-bold text-lg text-gray-900 dark:text-white">₹{product.price.toFixed(2)}</p>
                  <button 
                    className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    data-testid={`add-to-cart-${product.id}`}
                  >
                    <span className="text-lg font-bold">+</span>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/medicines/${product.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all flex gap-4"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-5xl md:text-6xl">💊</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg md:text-xl text-gray-900 dark:text-white">{product.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{product.brand}</p>
                    </div>
                    {product.requiresPrescription && (
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        RX
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{product.price.toFixed(2)}</span>
                      {product.mrp > product.price && (
                        <span className="text-sm text-gray-400 line-through ml-2">₹{product.mrp.toFixed(2)}</span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
