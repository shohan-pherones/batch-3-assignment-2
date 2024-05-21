import { IProduct } from './product.interface';
import Product from './product.model';

const createProductIntoDb = async (
  productData: IProduct,
): Promise<IProduct | null> => {
  const result = await Product.create(productData);
  return result;
};

const retrieveProductsFromDb = async (
  searchTerm: string,
): Promise<IProduct[] | null> => {
  const $regex = new RegExp(searchTerm, 'i');

  const result = await Product.find({
    $or: [
      { name: { $regex } },
      { description: { $regex } },
      { category: { $regex } },
      { tags: { $in: [$regex] } },
      { 'variants.type': { $regex } },
      { 'variants.value': { $regex } },
    ],
  });
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

const deleteProductFromDb = async (productId: string): Promise<null> => {
  await Product.findByIdAndDelete(productId);
  return null;
};

export const ProductServices = {
  createProductIntoDb,
  retrieveProductsFromDb,
  retrieveProductByIdFromDb,
  mutateProductInDb,
  deleteProductFromDb,
};
