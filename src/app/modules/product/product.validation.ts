import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string().nonempty({ message: 'Variant type is required' }),
  value: z.string().nonempty({ message: 'Variant value is required' }),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a non-negative number' }),
  inStock: z.boolean({ required_error: 'InStock status is required' }),
});

const productValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Product name is required' }),
  description: z
    .string()
    .nonempty({ message: 'Product description is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.string().nonempty({ message: 'Product category is required' }),
  tags: z
    .array(z.string().nonempty({ message: 'Tag cannot be empty' }))
    .nonempty({ message: 'At least one tag is required' }),
  variants: z
    .array(variantValidationSchema)
    .nonempty({ message: 'At least one variant is required' }),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
