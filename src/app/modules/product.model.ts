import { Schema, model } from "mongoose";
import { Product } from "./product.interface";

const productSchema = new Schema<Product>({
  productID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: {
      values: [
        "Writing",
        "Office Supplies",
        "Art Supplies",
        "Educational",
        "Technology",
      ],
      message: "{VALUE} is not valid",
    },
    required: true,
  },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

export const ProductModel = model<Product>("Product", productSchema);
