import { IProduct } from './product.interface';
import Product from './product.model';

const createProductIntoDb = async (productData: IProduct) => {
  const result = await Product.create(productData);
  return result;
};

export const ProductServices = {
  createProductIntoDb,
};
