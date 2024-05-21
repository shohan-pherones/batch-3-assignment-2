import { IProduct } from './product.interface';
import Product from './product.model';

const createProductIntoDb = async (
  productData: IProduct,
): Promise<IProduct | null> => {
  const result = await Product.create(productData);
  return result;
};

const retrieveProductsFromDb = async (): Promise<IProduct[] | null> => {
  const result = await Product.find();
  return result;
};

const retrieveProductByIdFromDb = async (
  productId: string,
): Promise<IProduct | null> => {
  const result = await Product.findById(productId);
  return result;
};

const mutateProductInDb = async (
  productId: string,
  productData: IProduct,
): Promise<IProduct | null> => {
  const result = await Product.findByIdAndUpdate(productId, productData, {
    new: true,
  });
  return result;
};

export const ProductServices = {
  createProductIntoDb,
  retrieveProductsFromDb,
  retrieveProductByIdFromDb,
  mutateProductInDb,
};
