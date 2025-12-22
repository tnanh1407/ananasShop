import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  createColorController,
  deleteColorController,
  getAllColorsController,
  getColorByIdController,
  updateColorController,
} from "../controllers/colorController.js";

const router = express.Router();
// --- PUBLIC ROUTES (Ai cũng truy cập được) ---
router.get("/", getAllColorsController);
router.get("/:id", getColorByIdController);

// --- PROTECTED ROUTES (Phải đăng nhập mới dùng được) ---

// Chỉ user đã login mới được sửa

// Route dành riêng cho Admin (Phải login VÀ là Admin)
router.post("/", protect, admin, createColorController);
router.patch("/:id", protect, admin, updateColorController);
router.delete("/:id", protect, admin, deleteColorController);

export default router;
