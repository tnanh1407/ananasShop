import express from "express";
import {
  deleteUserController,
  getAllUsersController,
  getByIdUserController,
  getProfileUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
  updateAvatarController,
  updateUserController,
} from "../controllers/usersController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import { uploadUser } from "../config/cloudinary.js";

const router = express.Router();
// --- PUBLIC ROUTES (Ai cũng truy cập được) ---
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

// --- PROTECTED ROUTES (Phải đăng nhập mới dùng được) ---
// Chỉ user đã login mới được sửa
router.get("/profile", protect, getProfileUserController);
router.patch("/:id", protect, updateUserController);
router.get("/:id", protect, getByIdUserController);
router.post(
  "/upload-avatar",
  protect,
  uploadUser.single("avatar"),
  updateAvatarController
);

// Route dành riêng cho Admin (Phải login VÀ là Admin)
router.delete("/:id", protect, admin, deleteUserController);
router.get("/", protect, admin, getAllUsersController);
export default router;
