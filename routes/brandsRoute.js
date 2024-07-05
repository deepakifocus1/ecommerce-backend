import express from "express";
import {
  createBrandsCtrl,
  getBrandsCtrl,
  getSingleBrandCtrl,
  updateBrandCtrl,
  deleteBrandCtrl,
} from "../controllers/brandsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const brandsRoute = express.Router();

brandsRoute.post("/", isLoggedIn, createBrandsCtrl);
brandsRoute.get("/:id", getSingleBrandCtrl);
brandsRoute.get("/", getBrandsCtrl);
brandsRoute.put("/:id", isLoggedIn, updateBrandCtrl);
brandsRoute.delete("/:id", isLoggedIn, deleteBrandCtrl);

export default brandsRoute;
