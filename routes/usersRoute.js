import express from "express";
import { registerUserCtrl, loginUserCtrl } from "../controllers/UserCtrl.js";

const usersRoutes = express.Router();

usersRoutes.post("/api/v1/users/register", registerUserCtrl);
usersRoutes.post("/api/v1/users/login", loginUserCtrl);

export default usersRoutes;
