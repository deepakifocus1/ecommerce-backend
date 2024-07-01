import express from "express";
import {
  createCategoryCtrl,
  getCategoriesCtrl,
  getSingleCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} from "../controllers/categoriesCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const categoriesRoute = express.Router();

categoriesRoute.post("/", isLoggedIn, createCategoryCtrl);
categoriesRoute.get("/:id", getSingleCategoryCtrl);
categoriesRoute.get("/", getCategoriesCtrl);
categoriesRoute.put("/:id", isLoggedIn, updateCategoryCtrl);
categoriesRoute.delete("/:id", isLoggedIn, deleteCategoryCtrl);

export default categoriesRoute;
