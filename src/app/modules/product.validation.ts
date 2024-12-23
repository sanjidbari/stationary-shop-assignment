import z from "zod";

const singleProductSchema = z.object({
  productID: z.string().nonempty("Product ID is required"), // Unique product identifier
  name: z.string().nonempty("Product name is required"), // Name of the product
  brand: z.string().nonempty("Brand is required"), // Brand of the product
  price: z.number().positive("Price must be a positive number"), // Price of the product
  category: z.enum(
    ["Writing", "Office Supplies", "Art Supplies", "Educational", "Technology"],
    {
      errorMap: () => ({
        message:
          "Category must be one of Writing, Office Supplies, Art Supplies, Educational, Technology",
      }),
    },
  ), // Enum for the product category
  description: z.string().nonempty("Description is required"), // Brief description of the product
  quantity: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer"), // Quantity of product available
  inStock: z.boolean(), // Boolean to indicate stock availability
});

const bulkProductSchema = z.array(singleProductSchema);

export const productValidation = {
  singleProductSchema,
  bulkProductSchema,
};
