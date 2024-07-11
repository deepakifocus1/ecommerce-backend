import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createProductCtrl,
  getProductsCtrl,
  getProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} from "../controllers/productsCtrl.js";

const productRoutes = express.Router();

productRoutes.post("/", isLoggedIn, createProductCtrl);
productRoutes.get("/:id", getProductCtrl);
productRoutes.get("/", getProductsCtrl);
productRoutes.put("/:id", isLoggedIn, updateProductCtrl);
productRoutes.delete("/:id", isLoggedIn, deleteProductCtrl);
export default productRoutes;
