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
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: false,
      data: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductFromDB();

    res.status(200).json({
      success: true,
      message: "Products are retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: false,
      data: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Requested product is retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: false,
      data: error,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { product: productData } = req.body;

    const result = await ProductServices.updateSingleProductIntoDB(
      productId,
      productData,
    );

    if (!result) {
      return res.status(404).json({
        message: "Product not found",
        status: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product is updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: false,
      data: error,
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProductFromDB(productId);

    if (!result) {
      return res.status(404).json({
        message: "Product not found",
        status: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product is deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: false,
      data: error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
