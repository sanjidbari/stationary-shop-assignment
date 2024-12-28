import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createSingleProductIntoDB = async (productData: Product) => {
  const product = new ProductModel(productData);
  const result = await product.save();
  return result;
};
const createBulkProductIntoDB = async (productData: Product[]) => {
  const result = await ProductModel.insertMany(productData);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findOne({ productID: productId });
  return result;
};

const updateSingleProductIntoDB = async (
  productId: string,
  productData: Product,
) => {
  const result = await ProductModel.findOneAndUpdate(
    { productID: productId },
    { $set: productData },
    { new: true },
  );
  return result;
};

const deleteSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findOneAndDelete({ productID: productId });
  return result;
};

export const ProductServices = {
  createSingleProductIntoDB,
  createBulkProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
  deleteSingleProductFromDB,
};
