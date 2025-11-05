const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${API_BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.message || 'An error occurred'
    );
  }

  return data;
}

// API Service Methods
export const api = {
  // Products
  products: {
    getAll: (params?: Record<string, string>) =>
      apiClient('/products', { params }),
    getById: (id: string) => apiClient(`/products/${id}`),
    search: (query: string, params?: Record<string, string>) =>
      apiClient(`/products/search/${query}`, { params }),
    getByCategory: (category: string, params?: Record<string, string>) =>
      apiClient(`/products/category/${category}`, { params }),
  },

  // Lab Tests
  labTests: {
    getAll: (params?: Record<string, string>) =>
      apiClient('/lab-tests', { params }),
    getById: (id: string) => apiClient(`/lab-tests/${id}`),
    search: (query: string, params?: Record<string, string>) =>
      apiClient(`/lab-tests/search/${query}`, { params }),
    getByCategory: (category: string, params?: Record<string, string>) =>
      apiClient(`/lab-tests/category/${category}`, { params }),
  },

  // Orders
  orders: {
    getAll: (params?: Record<string, string>) =>
      apiClient('/orders', { params }),
    getById: (id: string) => apiClient(`/orders/${id}`),
    create: (data: any) =>
      apiClient('/orders', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateStatus: (id: string, status: string) =>
      apiClient(`/orders/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }),
  },

  // Health
  health: () => apiClient('/health'),
};
