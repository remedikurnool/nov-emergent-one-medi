import { Router } from 'express';
import * as bookingController from '../controllers/booking.controller';

const router = Router();

// Booking routes
router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/', bookingController.createBooking);
router.put('/:id', bookingController.updateBookingStatus);
router.delete('/:id', bookingController.cancelBooking);

export default router;
