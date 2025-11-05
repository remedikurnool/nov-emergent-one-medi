'use client';

import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin-layout';

export default function LabTestsPage() {
  const [labTests, setLabTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLabTests() {
      try {
        const response = await fetch('http://localhost:8001/api/v1/lab-tests');
        const data = await response.json();
        setLabTests(data.data || []);
      } catch (error) {
        console.error('Failed to load lab tests:', error);
      } finally {
        setLoading(false);
      }
    }
    loadLabTests();
  }, []);

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Lab Tests</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage lab test catalog</p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90">
            <Plus className="w-5 h-5" />
            Add Lab Test
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parameters</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {labTests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🧪</span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{test.name}</p>
                        {test.isPopular && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Popular</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{test.category}</td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">₹{test.price}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{test.parameters?.length || 0}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{test.reportTime}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
