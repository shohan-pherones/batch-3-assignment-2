import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const parsedOrderData = orderValidationSchema.parse(orderData);
    const result = await OrderService.createOrderIntoDb(parsedOrderData);

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

const retrieveOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query as { email: string };

    const { data, message } = await OrderService.retrieveOrdersFromDb(email);

    res.status(200).json({
      success: true,
      message,
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

export const OrderController = {
  createOrder,
  retrieveOrders,
};
