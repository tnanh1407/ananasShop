import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

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

app.use("/api/user", userRouter);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
