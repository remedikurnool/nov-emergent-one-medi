import { Request, Response, NextFunction } from 'express';

// Mock data - Orders
const mockOrders: any[] = [];

// Get all orders
export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    let filteredOrders = [...mockOrders];

    if (req.query.status) {
      filteredOrders = filteredOrders.filter(
        (o) => o.status === req.query.status
      );
    }

    const total = filteredOrders.length;
    const orders = filteredOrders.slice(skip, skip + limit);

    res.json({
      success: true,
      data: orders,
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

// Get order by ID
export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const order = mockOrders.find((o) => o.id === id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// Create order
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, addressId, items, paymentMethod, notes } = req.body;

    // Calculate totals
    let subtotal = 0;
    const orderItems = items.map((item: any) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        discount: 0,
        total: itemTotal,
      };
    });

    const deliveryCharge = subtotal >= 500 ? 0 : 50;
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + deliveryCharge + tax;

    // Generate order number
    const orderNumber = `OM${Date.now()}`;

    // Create order
    const order = {
      id: String(mockOrders.length + 1),
      orderNumber,
      userId,
      addressId,
      subtotal,
      deliveryCharge,
      tax,
      total,
      paymentMethod,
      notes,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      items: orderItems,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockOrders.push(order);

    res.status(201).json({
      success: true,
      data: order,
      message: 'Order created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Update order status
export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const index = mockOrders.findIndex((o) => o.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    mockOrders[index].status = status;
    mockOrders[index].updatedAt = new Date();

    res.json({
      success: true,
      data: mockOrders[index],
      message: 'Order status updated successfully',
    });
  } catch (error) {
    next(error);
  }
};
