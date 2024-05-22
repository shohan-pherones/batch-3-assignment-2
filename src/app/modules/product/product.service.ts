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
): Promise<{ data: IProduct[] | null; message: string }> => {
  if (searchTerm) {
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
    return {
      data: result,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
    };
  } else {
    const result = await Product.find();
    return {
      data: result,
      message: 'Products fetched successfully!',
    };
  }
};

const retrieveProductByIdFromDb = async (
  productId: string,
): Promise<IProduct | null> => {
  const result = await Product.findById(productId);
  return result;
};

const mutateProductInDb = async (
  productId: string,
  productData: Partial<IProduct>,
): Promise<IProduct | null> => {
  const result = await Product.findByIdAndUpdate(
    productId,
    { $set: productData },
    {
      new: true,
    },
  );
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
