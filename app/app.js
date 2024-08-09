import express from "express";
import connectDB from "../config/connectDB.js";
import dotenv from "dotenv";
import usersRoutes from "../routes/usersRoute.js";
import { globalErrHandler, notFound } from "../middlewares/gobalErrHandler.js";
import productRoutes from "../routes/productsRoute.js";
import categoriesRoute from "../routes/categoriesRoute.js";
import brandsRoute from "../routes/brandsRoute.js";
import colorsRoute from "../routes/colorsRoute.js";
import reviewsRoute from "../routes/reviewsRoute.js";
import orderRoute from "../routes/orderRoute.js";
dotenv.config();

//database connection
connectDB();
const app = express();

//middlewares
app.use(express.json());

//routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/brands", brandsRoute);
app.use("/api/v1/colors", colorsRoute);
app.use("/api/v1/reviews", reviewsRoute);
app.use("/api/v1/orders", orderRoute);
//err middleware
app.use(notFound);
app.use(globalErrHandler);
export default app;
