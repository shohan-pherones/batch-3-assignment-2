import { IProduct } from './product.interface';
import Product from './product.model';

const createProductIntoDb = async (productData: IProduct) => {
  const result = await Product.create(productData);
  return result;
};

const retrieveProductsFromDb = async () => {
  const result = await Product.find();
  return result;
};

export const ProductServices = {
  createProductIntoDb,
  retrieveProductsFromDb,
};
