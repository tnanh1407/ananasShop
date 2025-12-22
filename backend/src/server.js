import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
// Router
import userRouter from "./routes/userRoutes.js";
import colorRouter from "./routes/colorRoutes.js";
import designRouter from "./routes/designRoutes.js";
import meterialRouter from "./routes/materialRoutes.js";
import collectionRouter from "./routes/collectionRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // set domain cụ thể cho frontend
    credentials: true, // cho phép trình duyệt gửi cookie
  })
);
app.use(express.json());
app.use(cookieParser());

// api
app.use("/api/product", productRouter);
app.use("/api/controller", collectionRouter);
app.use("/api/material", meterialRouter);
app.use("/api/design", designRouter);
app.use("/api/color", colorRouter);
app.use("/api/user", userRouter);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
