import { Router } from 'express';
import * as orderController from '../controllers/order.controller';

const router = Router();

// Order routes
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrderStatus);

export default router;
