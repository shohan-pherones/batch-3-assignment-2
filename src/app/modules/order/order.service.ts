import Product from '../product/product.model';
import { IOrder } from './order.interface';
import Order from './order.model';

const createOrderIntoDb = async (orderData: IOrder): Promise<IOrder | null> => {
  // find the product
  const product = await Product.findById(orderData.productId);

  // if product is not found, throw an error
  if (!product) {
    throw new Error('Product not found');
  }

  // check stock
  const isStock = product.inventory.inStock;

  // if product is not in stock, throw an error
  if (!isStock) {
    throw new Error('Product is not in stock');
  }

  // check stock availability
  const isSufficientQuantity =
    product.inventory.quantity - orderData.quantity >= 0;

  // if stock is insufficient, throw an error
  if (!isSufficientQuantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  // create order
  const order = await Order.create(orderData);

  // calculate new quantity
  const newQuantity = product.inventory.quantity - orderData.quantity;

  // update stock and inStock status
  const updatedProduct = await Product.findByIdAndUpdate(
    product._id,
    {
      'inventory.quantity': newQuantity,
      'inventory.inStock': newQuantity > 0,
    },
    { new: true },
  );

  // if the product update fails, throw an error
  if (!updatedProduct) {
    throw new Error('Failed to update product inventory');
  }

  return order;
};

const retrieveOrdersFromDb = async (): Promise<IOrder[] | null> => {
  const orders = await Order.find();
  return orders;
};

export const OrderService = {
  createOrderIntoDb,
  retrieveOrdersFromDb,
};
