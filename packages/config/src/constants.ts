// Application Constants
export const APP_NAME = 'ONE MEDI';
export const APP_DESCRIPTION = 'Comprehensive Healthcare E-Commerce Platform';

// API Configuration
export const API_VERSION = 'v1';
export const API_PREFIX = '/api';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Order
export const MIN_ORDER_AMOUNT = 1;
export const MAX_ORDER_AMOUNT = 100000;
export const DEFAULT_DELIVERY_CHARGE = 50;
export const FREE_DELIVERY_THRESHOLD = 500;

// Product Categories
export const PRODUCT_CATEGORIES = [
  'Medicines',
  'Lab Tests',
  'Scans',
  'Healthcare Devices',
  'Personal Care',
  'Baby Care',
  'Diabetes Care',
  'Ayurvedic',
  'Vitamins & Supplements',
] as const;

// Booking Types
export const BOOKING_TYPES = [
  'Lab Test',
  'Scan',
  'Doctor Consultation',
  'Home Care',
  'Physiotherapy',
] as const;

// Time Slots
export const TIME_SLOTS = [
  '08:00 AM - 09:00 AM',
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
] as const;
