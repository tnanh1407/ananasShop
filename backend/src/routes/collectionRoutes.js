import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  createCollectionController,
  deleteCollectionController,
  getAllCollectionsController,
  getCollectionByIdController,
  updateCollectionController,
} from "../controllers/collectionController.js";

const router = express.Router();
// --- PUBLIC ROUTES (Ai cũng truy cập được) ---
router.get("/", getAllCollectionsController);
router.get("/:id", getCollectionByIdController);

// --- PROTECTED ROUTES (Phải đăng nhập mới dùng được) ---

// Chỉ user đã login mới được sửa

// Route dành riêng cho Admin (Phải login VÀ là Admin)
router.post("/", protect, admin, createCollectionController);
router.patch("/:id", protect, admin, updateCollectionController);
router.delete("/:id", protect, admin, deleteCollectionController);

export default router;
