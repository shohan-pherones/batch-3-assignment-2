import mongoose, { model } from 'mongoose';
import { IInventory, IProduct, IVariant } from './product.interface';

const variantSchema = new mongoose.Schema<IVariant>({
  type: {
    type: String,
    required: [true, 'Variant type is required.'],
    trim: true,
    minlength: [3, 'Variant type must be at least 3 characters long.'],
    maxlength: [20, 'Variant type must be at most 20 characters long.'],
  },
  value: {
    type: String,
    required: [true, 'Variant value is required.'],
    trim: true,
    minlength: [1, 'Variant value must be at least 1 character long.'],
    maxlength: [20, 'Variant value must be at most 20 characters long.'],
  },
});

const inventorySchema = new mongoose.Schema<IInventory>({
  quantity: {
    type: Number,
    required: [true, 'Quantity is required.'],
    min: [0, 'Quantity cannot be less than 0.'],
    max: [999, 'Quantity cannot be more than 999.'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'In-stock status is required.'],
  },
});

const productSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required.'],
    trim: true,
    minlength: [3, 'Product name must be at least 3 characters long.'],
    maxlength: [30, 'Product name must be at most 30 characters long.'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required.'],
    trim: true,
    minlength: [10, 'Product description must be at least 10 characters long.'],
    maxlength: [
      500,
      'Product description must be at most 500 characters long.',
    ],
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
    min: [1, 'Price must be at least 1.'],
    max: [9999, 'Price must be at most 9999.'],
  },
  category: {
    type: String,
    required: [true, 'Category is required.'],
    trim: true,
    minlength: [3, 'Category must be at least 3 characters long.'],
    maxlength: [20, 'Category must be at most 20 characters long.'],
  },
  tags: [
    {
      type: String,
      required: [true, 'Each tag is required.'],
      trim: true,
      minlength: [3, 'Each tag must be at least 3 characters long.'],
      maxlength: [20, 'Each tag must be at most 20 characters long.'],
    },
  ],
  variants: [
    {
      type: variantSchema,
      required: [true, 'At least one variant is required.'],
    },
  ],
  inventory: {
    type: inventorySchema,
    required: [true, 'Inventory information is required.'],
  },
});

const Product = model<IProduct>('Product', productSchema);

export default Product;
