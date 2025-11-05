import { Router } from 'express';
import * as productController from '../controllers/product.controller';

const router = Router();

// Product routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Search and filter
router.get('/search/:query', productController.searchProducts);
router.get('/category/:category', productController.getProductsByCategory);

export default router;
