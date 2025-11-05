'use client';

import { VendorLayout } from '@/components/vendor-layout';
import { AlertTriangle, TrendingDown, Package } from 'lucide-react';

export default function InventoryPage() {
  const inventory = [
    { id: '1', name: 'Dolo 650', stock: 450, lowStock: false, reorderLevel: 50 },
    { id: '2', name: 'Combiflam', stock: 25, lowStock: true, reorderLevel: 50 },
    { id: '3', name: 'Volini Gel', stock: 180, lowStock: false, reorderLevel: 50 },
    { id: '4', name: 'Benadryl', stock: 12, lowStock: true, reorderLevel: 20 },
  ];

  const lowStockItems = inventory.filter((i) => i.lowStock);

  return (
    <VendorLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Inventory Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your product stock</p>
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <div>
                <p className="font-semibold text-orange-800 dark:text-orange-200">
                  {lowStockItems.length} {lowStockItems.length === 1 ? 'item' : 'items'} running low on stock
                </p>
                <p className="text-sm text-orange-700 dark:text-orange-300">Consider reordering soon</p>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reorder Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-gray-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-2xl font-bold ${
                      item.lowStock ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {item.reorderLevel}
                  </td>
                  <td className="px-6 py-4">
                    {item.lowStock ? (
                      <span className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold w-fit">
                        <TrendingDown className="w-4 h-4" />
                        Low Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        Good
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold text-sm">
                      Update Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </VendorLayout>
  );
}
