import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5001;

app.use("/api/products", productRoutes);

//Unused route handler
app.use(notFound);

//Custom error handling
app.use(errorHandler);

app.listen(5000, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);