import express from "express";

import { ProductController } from "./product.controller";
const router = express.Router();

router.post("/products", ProductController.createProduct);
router.get("/products");
router.get("/products/:productId");
router.put("/products/:productId");
router.delete("/products/:productId");

export const ProductRoutes = router;
