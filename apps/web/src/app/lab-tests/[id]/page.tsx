'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MapPin, Home as HomeIcon, Building2 } from 'lucide-react';
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

export default function LabTestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [labTest, setLabTest] = useState<LabTest | null>(null);
  const [loading, setLoading] = useState(true);
  const [collectionType, setCollectionType] = useState<'HOME_COLLECTION' | 'LAB_VISIT'>('HOME_COLLECTION');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    async function loadLabTest() {
      try {
        const res = await api.labTests.getById(params.id as string);
        setLabTest(res.data);
      } catch (error) {
        console.error('Failed to load lab test:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (params.id) {
      loadLabTest();
    }
  }, [params.id]);

  const handleBookTest = () => {
    // Navigate to checkout with booking data
    const bookingData = {
      type: 'LAB_TEST',
      labTestId: labTest?.id,
      collectionType,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
      price: labTest?.price,
    };
    
    // Store in localStorage for checkout
    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
    router.push('/checkout');
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!labTest) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold">Lab test not found</h2>
          <Link href="/lab-tests" className="text-primary hover:underline mt-4 inline-block">Back to Lab Tests</Link>
        </div>
      </AppLayout>
    );
  }

  // Generate next 7 days
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split('T')[0];
  });

  const timeSlots = [
    '08:00 AM - 09:00 AM',
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/lab-tests" className="hover:text-primary">Lab Tests</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{labTest.name}</span>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Test Details */}
          <div className="md:col-span-3">
            {labTest.isPopular && (
              <div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                ⭐ POPULAR TEST
              </div>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{labTest.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{labTest.category}</p>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">About This Test</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{labTest.description}</p>
            </div>

            {/* Parameters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Test Parameters ({labTest.parameters.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {labTest.parameters.map((param, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{param}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation */}
            {labTest.preparation && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
                  ℹ️ Preparation Required
                </h3>
                <p className="text-blue-800 dark:text-blue-300">{labTest.preparation}</p>
              </div>
            )}

            {/* Report Time */}
            <div className="flex items-center gap-6 text-sm mb-6">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-5 h-5 text-primary" />
                <span>Report in: <strong>{labTest.reportTime}</strong></span>
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm mb-2">Test Price</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">₹{labTest.price.toFixed(0)}</p>
              </div>

              {/* Collection Type */}
              <div className="mb-6">
                <label className="block font-semibold text-gray-900 dark:text-white mb-3">Collection Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCollectionType('HOME_COLLECTION')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      collectionType === 'HOME_COLLECTION'
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                    }`}
                  >
                    <HomeIcon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Home</p>
                    <p className="text-xs text-gray-500">We collect</p>
                  </button>
                  <button
                    onClick={() => setCollectionType('LAB_VISIT')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      collectionType === 'LAB_VISIT'
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                    }`}
                  >
                    <Building2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Lab Visit</p>
                    <p className="text-xs text-gray-500">You visit</p>
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block font-semibold text-gray-900 dark:text-white mb-3">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Select Date
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800"
                >
                  <option value="">Choose a date</option>
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-IN', {
                        weekday: 'short',
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <label className="block font-semibold text-gray-900 dark:text-white mb-3">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Select Time Slot
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  disabled={!selectedDate}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Choose a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookTest}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors mb-4"
              >
                Book Test
              </button>

              {/* Features */}
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>100% Safe & Hygienic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Reports in {labTest.reportTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Free Home Collection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
