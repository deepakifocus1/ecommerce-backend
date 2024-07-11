import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createReviewCtrl } from "../controllers/reviewsCtrl.js";

const reviewsRoute = express.Router();

reviewsRoute.post("/:productId", isLoggedIn, createReviewCtrl);

export default reviewsRoute;
