import { z } from 'zod';

// User Schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Address Schema
export const addressSchema = z.object({
  type: z.enum(['HOME', 'WORK', 'OTHER']),
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, 'Invalid pincode'),
  isDefault: z.boolean().optional(),
});

// Order Schema
export const createOrderSchema = z.object({
  addressId: z.string().uuid('Invalid address ID'),
  items: z.array(
    z.object({
      productId: z.string().uuid('Invalid product ID'),
      quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    })
  ).min(1, 'At least one item is required'),
  paymentMethod: z.enum(['COD', 'CARD', 'UPI', 'WALLET', 'NET_BANKING']),
  notes: z.string().optional(),
});

// Booking Schema
export const createBookingSchema = z.object({
  type: z.enum(['LAB_TEST', 'SCAN', 'DOCTOR_CONSULTATION', 'HOME_CARE']),
  labTestId: z.string().uuid().optional(),
  addressId: z.string().uuid().optional(),
  collectionType: z.enum(['HOME_COLLECTION', 'LAB_VISIT']).optional(),
  scheduledDate: z.string().datetime().optional(),
  scheduledTime: z.string().optional(),
  paymentMethod: z.enum(['COD', 'CARD', 'UPI', 'WALLET', 'NET_BANKING']),
  notes: z.string().optional(),
});

// Review Schema
export const createReviewSchema = z.object({
  productId: z.string().uuid('Invalid product ID'),
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  title: z.string().optional(),
  comment: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
