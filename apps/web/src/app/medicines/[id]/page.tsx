'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
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
  composition: string;
  requiresPrescription: boolean;
  discount?: number;
  stock: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((state) => state.addItem);
  const cartItems = useCart((state) => state.getTotalItems());

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await api.products.getById(params.id as string);
        setProduct(res.data);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem({
          productId: product.id,
          name: product.name,
          price: product.price,
          unit: product.unit,
          requiresPrescription: product.requiresPrescription,
        });
      }
      router.push('/cart');
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!product) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Link href="/medicines" className="text-primary hover:underline mt-4 inline-block">Back to Medicines</Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/medicines" className="hover:text-primary">Medicines</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 flex items-center justify-center sticky top-24 h-fit">
            <div className="text-9xl">💊</div>
          </div>

          {/* Product Info */}
          <div>
            {product.requiresPrescription && (
              <div className="inline-block bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                💊 PRESCRIPTION REQUIRED
              </div>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{product.brand}</p>
            
            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">₹{product.price.toFixed(2)}</span>
              {product.mrp > product.price && (
                <>
                  <span className="text-2xl text-gray-400 line-through">₹{product.mrp.toFixed(2)}</span>
                  <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">
                    {product.discount?.toFixed(0)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Unit */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pack Size</p>
              <p className="font-semibold text-gray-900 dark:text-white">{product.unit}</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">About Product</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
            </div>

            {/* Composition */}
            {product.composition && (
              <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Composition</h3>
                <p className="text-gray-600 dark:text-gray-400">{product.composition}</p>
              </div>
            )}

            {/* Stock */}
            <div className="mb-6">
              <p className={`text-sm font-semibold ${
                product.stock > 10 ? 'text-green-600' : 'text-orange-600'
              }`}>
                {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block font-semibold text-gray-900 dark:text-white mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg font-bold text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  data-testid="decrease-quantity"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center text-gray-900 dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg font-bold text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  data-testid="increase-quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                data-testid="add-to-cart-btn"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="bg-white dark:bg-gray-800 border-2 border-primary text-primary font-bold py-4 px-8 rounded-xl hover:bg-primary/10 transition-colors">
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 text-center">
              <div>
                <div className="text-2xl mb-1">✔️</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">100% Genuine</p>
              </div>
              <div>
                <div className="text-2xl mb-1">🚚</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Fast Delivery</p>
              </div>
              <div>
                <div className="text-2xl mb-1">🔄</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
