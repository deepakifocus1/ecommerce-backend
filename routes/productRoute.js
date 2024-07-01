import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createProductCtrl,
  getProductsCtrl,
} from "../controllers/productCtrl.js";

const productRoutes = express.Router();

productRoutes.post("/", isLoggedIn, createProductCtrl);
productRoutes.get("/", getProductsCtrl);

export default productRoutes;
