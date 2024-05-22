import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const parsedProductData = productValidationSchema.parse(productData);
    const result = await ProductServices.createProductIntoDb(parsedProductData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
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

const retrieveProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query as { searchTerm: string };
    const { data, message } =
      await ProductServices.retrieveProductsFromDb(searchTerm);

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

const retrieveProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.retrieveProductByIdFromDb(productId);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
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

const mutateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;

    // find the product based on id
    const isExist = await ProductServices.retrieveProductByIdFromDb(productId);

    // if product is not found, throw an error
    if (!isExist) {
      throw new Error('Product is not found!');
    }

    // initiate a partial schema
    const partialProductValidationSchema = productValidationSchema.partial();

    // validate product data
    const parsedProductData = partialProductValidationSchema.parse(productData);

    // mutate product
    const result = await ProductServices.mutateProductInDb(
      productId,
      parsedProductData,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // find the product based on id
    const isExist = await ProductServices.retrieveProductByIdFromDb(productId);

    // if product is not found, throw an error
    if (!isExist) {
      throw new Error('Product is not found!');
    }

    // delete product
    const result = await ProductServices.deleteProductFromDb(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
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

export const ProductController = {
  createProduct,
  retrieveProducts,
  retrieveProductById,
  mutateProduct,
  deleteProduct,
};
