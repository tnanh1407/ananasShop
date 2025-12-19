import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import Material from "./models/Material.js";
import { materials } from "./data/materials.seed.js";

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

// import dữ liệu vào :
const seedMaterials = async () => {
  try {
    await Material.deleteMany();
    await Material.insertMany(materials);
    console.log("✅ Insert materials thành công");
    process.exit();
  } catch (e) {
    console.log("Error insert material : ", e);
    process.exit();
  }
};

seedMaterials();
app.use("/api/user", userRouter);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
