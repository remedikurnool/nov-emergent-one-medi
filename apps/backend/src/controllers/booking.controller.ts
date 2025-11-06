import { Request, Response, NextFunction } from 'express';

// Mock bookings data
const mockBookings: any[] = [];

// Get all bookings
export const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    let filteredBookings = [...mockBookings];

    if (req.query.status) {
      filteredBookings = filteredBookings.filter(
        (b) => b.status === req.query.status
      );
    }

    if (req.query.userId) {
      filteredBookings = filteredBookings.filter(
        (b) => b.userId === req.query.userId
      );
    }

    const total = filteredBookings.length;
    const bookings = filteredBookings.slice(skip, skip + limit);

    res.json({
      success: true,
      data: bookings,
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

// Get booking by ID
export const getBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const booking = mockBookings.find((b) => b.id === id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// Create booking
export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingData = req.body;

    // Generate booking number
    const bookingNumber = `BK${Date.now()}`;

    const newBooking = {
      id: String(mockBookings.length + 1),
      bookingNumber,
      ...bookingData,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockBookings.push(newBooking);

    res.status(201).json({
      success: true,
      data: newBooking,
      message: 'Booking created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Update booking status
export const updateBookingStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const index = mockBookings.findIndex((b) => b.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    mockBookings[index].status = status;
    mockBookings[index].updatedAt = new Date();

    res.json({
      success: true,
      data: mockBookings[index],
      message: 'Booking status updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Cancel booking
export const cancelBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const index = mockBookings.findIndex((b) => b.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    mockBookings[index].status = 'CANCELLED';
    mockBookings[index].updatedAt = new Date();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    next(error);
  }
};
