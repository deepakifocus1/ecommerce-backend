import express from "express";
import {
  registerUserCtrl,
  loginUserCtrl,
  getUserProfileCtrl,
} from "../controllers/userCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const usersRoutes = express.Router();

usersRoutes.post("/register", registerUserCtrl);
usersRoutes.post("/login", loginUserCtrl);
usersRoutes.get("/profile", isLoggedIn, getUserProfileCtrl);

export default usersRoutes;
