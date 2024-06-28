import express from "express";
import connectDB from "../config/connectDB.js";
import dotenv from "dotenv";
import usersRoutes from "../routes/usersRoute.js";
import { globalErrHandler, notFound } from "../middlewares/gobalErrHandler.js";
dotenv.config();

//database connection
connectDB();
const app = express();

//middlewares
app.use(express.json());

//routes
app.use("/", usersRoutes);

//err middleware
app.use(notFound);
app.use(globalErrHandler);
export default app;
