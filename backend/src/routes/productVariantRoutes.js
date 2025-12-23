import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  createVariantController,
  deleteVariantController,
  getVariantByIdController,
  getVariantsByProductController,
  updateVariantController,
} from "../controllers/productVariantController.js";
const router = express.Router();
// Lấy tất cả biến thể của 1 sản phẩm (Công khai cho người dùng chọn size/màu)
router.get("/product/:productId", getVariantsByProductController);

// Lấy chi tiết 1 biến thể duy nhất theo ID (Dùng cho Admin sửa hoặc check kho)
router.get("/:id", protect, admin, getVariantByIdController);

// Các chức năng CRUD khác dành cho Admin
router.post("/", protect, admin, createVariantController);
router.patch("/:id", protect, admin, updateVariantController);
router.delete("/:id", protect, admin, deleteVariantController);

export default router;
