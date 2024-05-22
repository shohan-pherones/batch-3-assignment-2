import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { OrderRoutes } from './app/modules/order/order.route';
import { ProductRoutes } from './app/modules/product/product.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

// handle not found routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
