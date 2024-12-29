import { Order } from "./order.interface";
import { OrderModel } from "./order.model";
import { ProductModel } from "../product/product.model";

const createOrderService = async (orderData: Order) => {
  const { email, product, quantity, totalPrice } = orderData;

  // Check if product exists and has sufficient stock
  const productInDB = await ProductModel.findById({ _id: product });
  if (!productInDB) {
    throw new Error("Product not found");
  }
  if (productInDB.quantity < quantity) {
    throw new Error("Insufficient stock for the product");
  }

  // Update product inventory
  productInDB.quantity -= quantity;
  productInDB.inStock = productInDB.quantity > 0;
  await productInDB.save();

  // Create the order
  const order = new OrderModel({ email, product, quantity, totalPrice });
  const result = await order.save();

  return result;
};

const calculateTotalRevenueService = async () => {
  const revenue = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
  ]);

  return revenue.length ? revenue[0].totalRevenue : 0;
};

export const OrderServices = {
  createOrderService,
  calculateTotalRevenueService,
};
