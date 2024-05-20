import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z
    .string()
    .nonempty({ message: 'Type is required and cannot be empty' }),
  value: z
    .string()
    .nonempty({ message: 'Value is required and cannot be empty' }),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .int()
    .nonnegative({ message: 'Quantity must be a non-negative integer' }),
  inStock: z.boolean({ message: 'InStock must be a boolean value' }),
});

const productValidationSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'Name is required and cannot be empty' }),
  description: z
    .string()
    .nonempty({ message: 'Description is required and cannot be empty' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z
    .string()
    .nonempty({ message: 'Category is required and cannot be empty' }),
  tags: z
    .array(z.string().nonempty({ message: 'Tags cannot be empty' }))
    .nonempty({ message: 'At least one tag is required' }),
  variants: variantValidationSchema,
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
