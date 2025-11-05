'use client';

import { Plus, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { VendorLayout } from '@/components/vendor-layout';

export default function VendorProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('http://localhost:8001/api/v1/products?limit=10');
        const data = await response.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    }
    loadProducts();
  }, []);

  return (
    <VendorLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Products</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your product listings</p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90">
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-3xl">
                  💊
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  product.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.status}
                </span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{product.price}</p>
                  <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold text-sm">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </VendorLayout>
  );
}
