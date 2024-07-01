import express from "express";
import connectDB from "../config/connectDB.js";
import dotenv from "dotenv";
import usersRoutes from "../routes/usersRoute.js";
import { globalErrHandler, notFound } from "../middlewares/gobalErrHandler.js";
import productRoutes from "../routes/productRoute.js";
import categoriesRoute from "../routes/categoriesRoute.js";
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
//err middleware
app.use(notFound);
app.use(globalErrHandler);
export default app;
