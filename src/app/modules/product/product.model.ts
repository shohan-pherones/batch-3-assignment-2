import mongoose, { model } from 'mongoose';
import { IInventory, IProduct, IVariant } from './product.interface';

const variantSchema = new mongoose.Schema<IVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new mongoose.Schema<IInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String, required: true }],
  variants: [{ type: variantSchema, required: true }],
  inventory: { type: inventorySchema, required: true },
});

const Product = model<IProduct>('Product', productSchema);

export default Product;
