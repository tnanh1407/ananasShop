import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();
// --- PUBLIC ROUTES (Ai cũng truy cập được) ---
router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);

// --- PROTECTED ROUTES (Phải đăng nhập mới dùng được) ---

// Chỉ user đã login mới được sửa

// Route dành riêng cho Admin (Phải login VÀ là Admin)
router.post("/", protect, admin, createProductController);
router.patch("/:id", protect, admin, updateProductController);
router.delete("/:id", protect, admin, deleteProductController);

export default router;
