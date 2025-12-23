import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  createSizeController,
  deleteSizeController,
  getAllSizesController,
  getSizeByIdController,
  updateSizeController,
} from "../controllers/sizeController.js";

const router = express.Router();
// --- PUBLIC ROUTES (Ai cũng truy cập được) ---
router.get("/", getAllSizesController);
router.get("/:id", getSizeByIdController);

// --- PROTECTED ROUTES (Phải đăng nhập mới dùng được) ---

// Chỉ user đã login mới được sửa

// Route dành riêng cho Admin (Phải login VÀ là Admin)
router.post("/", protect, admin, createSizeController);
router.patch("/:id", protect, admin, updateSizeController);
router.delete("/:id", protect, admin, deleteSizeController);

export default router;
