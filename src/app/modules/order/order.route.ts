import express, { Router } from 'express';
import { OrderController } from './order.controller';

const router: Router = express.Router();

router.post('/', OrderController.createOrder);
router.get('/', OrderController.retrieveOrders);

export const OrderRoutes = router;
