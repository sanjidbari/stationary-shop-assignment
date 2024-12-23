import { Request, Response } from "express";
import { productValidation } from "./product.validation";
import { ProductServices } from "./product.services";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    // Validate input for single or bulk
    const isArray = Array.isArray(productData);
    const validationSchema = isArray
      ? productValidation.bulkProductSchema
      : productValidation.singleProductSchema;

    // Parse and validate data
    const zodParsedData = validationSchema.parse(productData); // Type assertion here

    // Process data
    const result = isArray
      ? await ProductServices.createBulkProductIntoDB(zodParsedData) // For bulk input
      : await ProductServices.createSingleProductIntoDB(zodParsedData); // For single input

    res.status(200).json({
      success: true,
      message: `Product${isArray ? "s" : ""} created successfully`,
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const ProductController = {
  createProduct,
};
