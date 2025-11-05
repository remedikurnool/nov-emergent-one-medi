import { Router } from 'express';
import * as labTestController from '../controllers/labtest.controller';

const router = Router();

// Lab Test routes
router.get('/', labTestController.getAllLabTests);
router.get('/:id', labTestController.getLabTestById);
router.post('/', labTestController.createLabTest);
router.put('/:id', labTestController.updateLabTest);
router.delete('/:id', labTestController.deleteLabTest);

// Search and filter
router.get('/search/:query', labTestController.searchLabTests);
router.get('/category/:category', labTestController.getLabTestsByCategory);

export default router;
