import { Request, Response, NextFunction } from 'express';

// Mock data - Products
const mockProducts = [
  {
    id: '1',
    name: 'Dolo 650 Tablet',
    slug: 'dolo-650-tablet',
    description: 'Paracetamol 650mg tablets for fever and pain relief',
    category: 'Medicines',
    brand: 'Micro Labs',
    manufacturer: 'Micro Labs Limited',
    composition: 'Paracetamol 650mg',
    price: 30.0,
    mrp: 35.0,
    discount: 14.29,
    stock: 500,
    unit: 'Strip of 15 tablets',
    requiresPrescription: false,
    images: ['/products/dolo-650.jpg'],
    status: 'ACTIVE',
    tags: ['fever', 'pain relief', 'paracetamol'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Combiflam Tablet',
    slug: 'combiflam-tablet',
    description: 'Ibuprofen 400mg + Paracetamol 325mg for pain and inflammation',
    category: 'Medicines',
    brand: 'Sanofi',
    manufacturer: 'Sanofi India Limited',
    composition: 'Ibuprofen 400mg + Paracetamol 325mg',
    price: 42.5,
    mrp: 50.0,
    discount: 15.0,
    stock: 300,
    unit: 'Strip of 20 tablets',
    requiresPrescription: true,
    images: ['/products/combiflam.jpg'],
    status: 'ACTIVE',
    tags: ['pain', 'inflammation', 'fever'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Volini Pain Relief Gel',
    slug: 'volini-pain-relief-gel',
    description: 'Topical analgesic for muscle and joint pain',
    category: 'Personal Care',
    brand: 'Volini',
    manufacturer: 'Ranbaxy Laboratories',
    composition: 'Diclofenac Diethylamine 1.16% w/w',
    price: 195.0,
    mrp: 220.0,
    discount: 11.36,
    stock: 200,
    unit: '75g Tube',
    requiresPrescription: false,
    images: ['/products/volini-gel.jpg'],
    status: 'ACTIVE',
    tags: ['pain relief', 'topical', 'muscle pain'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Benadryl Cough Syrup',
    slug: 'benadryl-cough-syrup',
    description: 'Relief from cough and cold symptoms',
    category: 'Medicines',
    brand: 'Benadryl',
    manufacturer: 'Johnson & Johnson',
    composition: 'Diphenhydramine HCl',
    price: 121.0,
    mrp: 135.0,
    discount: 10.37,
    stock: 150,
    unit: '150ml Bottle',
    requiresPrescription: true,
    images: ['/products/benadryl.jpg'],
    status: 'ACTIVE',
    tags: ['cough', 'cold', 'syrup'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Crocin Advance Tablet',
    slug: 'crocin-advance-tablet',
    description: 'Fast relief from fever and body pain',
    category: 'Medicines',
    brand: 'Crocin',
    manufacturer: 'GSK',
    composition: 'Paracetamol 500mg',
    price: 28.0,
    mrp: 32.0,
    discount: 12.5,
    stock: 400,
    unit: 'Strip of 15 tablets',
    requiresPrescription: false,
    images: ['/products/crocin.jpg'],
    status: 'ACTIVE',
    tags: ['fever', 'pain', 'headache'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Accu-Chek Glucometer',
    slug: 'accu-chek-glucometer',
    description: 'Blood glucose monitoring system with 10 strips',
    category: 'Healthcare Devices',
    brand: 'Accu-Chek',
    manufacturer: 'Roche',
    composition: 'Electronic Device',
    price: 1299.0,
    mrp: 1625.0,
    discount: 20.06,
    stock: 50,
    unit: '1 Device + 10 strips',
    requiresPrescription: false,
    images: ['/products/glucometer.jpg'],
    status: 'ACTIVE',
    tags: ['diabetes', 'blood sugar', 'monitoring'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Get all products with pagination and filters
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    let filteredProducts = mockProducts.filter((p) => p.status === 'ACTIVE');

    if (req.query.category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === req.query.category
      );
    }

    const total = filteredProducts.length;
    const products = filteredProducts.slice(skip, skip + limit);

    res.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get product by ID
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = mockProducts.find((p) => p.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Create product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = req.body;
    const newProduct = {
      id: String(mockProducts.length + 1),
      ...productData,
      slug: productData.name.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    mockProducts.push(newProduct);

    res.status(201).json({
      success: true,
      data: newProduct,
      message: 'Product created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Update product
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    mockProducts[index] = {
      ...mockProducts[index],
      ...updateData,
      updatedAt: new Date(),
    };

    res.json({
      success: true,
      data: mockProducts[index],
      message: 'Product updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Delete product (soft delete)
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    mockProducts[index].status = 'DISCONTINUED';

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Search products
export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const searchLower = query.toLowerCase();
    const filteredProducts = mockProducts.filter(
      (p) =>
        p.status === 'ACTIVE' &&
        (p.name.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower) ||
          p.brand?.toLowerCase().includes(searchLower) ||
          p.composition?.toLowerCase().includes(searchLower))
    );

    const total = filteredProducts.length;
    const products = filteredProducts.slice(skip, skip + limit);

    res.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get products by category
export const getProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const filteredProducts = mockProducts.filter(
      (p) => p.category === category && p.status === 'ACTIVE'
    );

    const total = filteredProducts.length;
    const products = filteredProducts.slice(skip, skip + limit);

    res.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};
