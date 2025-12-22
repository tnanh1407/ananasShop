import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  createMaterialController,
  deleteMaterialController,
  getAllMaterialsController,
  getMaterialByIdController,
  updateMaterialController,
} from "../controllers/materialController.js";

const router = express.Router();
// --- PUBLIC ROUTES (Ai cũng truy cập được) ---
router.get("/", getAllMaterialsController);
router.get("/:id", getMaterialByIdController);

// --- PROTECTED ROUTES (Phải đăng nhập mới dùng được) ---

// Chỉ user đã login mới được sửa

// Route dành riêng cho Admin (Phải login VÀ là Admin)
router.post("/", protect, admin, createMaterialController);
router.patch("/:id", protect, admin, updateMaterialController);
router.delete("/:id", protect, admin, deleteMaterialController);

export default router;
