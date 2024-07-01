import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createProductCtrl,
  getProductsCtrl,
  getProductCtrl,
  updateProductCtrl,
} from "../controllers/productCtrl.js";

const productRoutes = express.Router();

productRoutes.post("/", isLoggedIn, createProductCtrl);
productRoutes.get("/:id", getProductCtrl);
productRoutes.get("/", getProductsCtrl);
productRoutes.put("/:id", updateProductCtrl);
export default productRoutes;
