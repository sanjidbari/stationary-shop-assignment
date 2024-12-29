import { Request, Response } from "express";
import { OrderServices } from "./order.services";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;

    const result = await OrderServices.createOrderService({
      email,
      product,
      quantity,
      totalPrice,
    });

    if (!result) {
      res.status(404).json({
        message: "Product not found",
        status: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Order is created successfully",
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

const calculateRevenue = async (_req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderServices.calculateTotalRevenueService();

    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: false,
      data: error,
    });
  }
};

export const OrderController = {
  createOrder,
  calculateRevenue,
};
