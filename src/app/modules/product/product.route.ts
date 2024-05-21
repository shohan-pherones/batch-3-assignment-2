import express, { Router } from 'express';
import { ProductController } from './product.controller';

const router: Router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.retrieveProducts);
router.get('/:productId', ProductController.retrieveProductById);
router.put('/:productId', ProductController.mutateProduct);
router.delete('/:productId', ProductController.deleteProduct);

export const ProductRoutes = router;
