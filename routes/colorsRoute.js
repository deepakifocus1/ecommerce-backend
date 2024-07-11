import express from "express";
import {
  createColorCtrl,
  getColorsCtrl,
  getSingleColorCtrl,
  updateColorCtrl,
  deleteColorCtrl,
} from "../controllers/colorsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const colorsRoute = express.Router();

colorsRoute.post("/", isLoggedIn, createColorCtrl);
colorsRoute.get("/:id", getSingleColorCtrl);
colorsRoute.get("/", getColorsCtrl);
colorsRoute.put("/:id", isLoggedIn, updateColorCtrl);
colorsRoute.delete("/:id", isLoggedIn, deleteColorCtrl);

export default colorsRoute;
