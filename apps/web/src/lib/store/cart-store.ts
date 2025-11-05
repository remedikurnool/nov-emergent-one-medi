'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  requiresPrescription: boolean;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>()(  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const existingItem = get().items.find((i) => i.productId === item.productId);
        
        if (existingItem) {
          set((state) => ({
            items: state.items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
        } else {
          set((state) => ({
            items: [
              ...state.items,
              {
                id: `cart-${Date.now()}`,
                ...item,
                quantity: 1,
              },
            ],
          }));
        }
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
        } else {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          }));
        }
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'one-medi-cart',
    }
  )
);
