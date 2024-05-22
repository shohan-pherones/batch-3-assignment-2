import mongoose, { model } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new mongoose.Schema<IOrder>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    minlength: [5, 'Email must be at least 5 characters'],
    maxlength: [50, 'Email cannot exceed 50 characters'],
  },
  productId: {
    type: String,
    required: [true, 'Product ID is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    trim: true,
    min: [1, 'Price must be at least 1'],
    max: [9999, 'Price cannot exceed 9999'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    trim: true,
    min: [1, 'Quantity must be at least 1'],
    max: [999, 'Quantity cannot exceed 999'],
  },
});

const Order = model<IOrder>('Order', orderSchema);

export default Order;
