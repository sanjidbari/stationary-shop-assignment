import { Types } from "mongoose";

export interface Order {
  email: string; // Customer's email
  product: Types.ObjectId; // Reference to the product document
  quantity: number; // Quantity of the ordered product
  totalPrice: number; // Total price (product price * quantity)
}
