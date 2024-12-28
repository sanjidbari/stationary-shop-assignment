import express, { Application } from "express";
const app: Application = express();
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";

app.use(express.json());
app.use(cors());

app.use("/api", ProductRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

export default app;
