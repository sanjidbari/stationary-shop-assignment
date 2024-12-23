import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createSingleProductIntoDB = async (productData: Product) => {
  const product = new ProductModel(productData);
  const result = await product.save();
  return result;
};
const createBulkProductIntoDB = async (productData: Product) => {
  const result = await ProductModel.insertMany(productData);
  return result;
};

export const ProductServices = {
  createSingleProductIntoDB,
  createBulkProductIntoDB,
};
