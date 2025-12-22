import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  createDesignController,
  deleteDesignController,
  getAllDesignsController,
  getDesignByIdController,
  updateDesignController,
} from "../controllers/designController.js";

const router = express.Router();
// --- PUBLIC ROUTES (Ai cũng truy cập được) ---
router.get("/", getAllDesignsController);
router.get("/:id", getDesignByIdController);

// --- PROTECTED ROUTES (Phải đăng nhập mới dùng được) ---

// Chỉ user đã login mới được sửa

// Route dành riêng cho Admin (Phải login VÀ là Admin)
router.post("/", protect, admin, createDesignController);
router.patch("/:id", protect, admin, updateDesignController);
router.delete("/:id", protect, admin, deleteDesignController);

export default router;
