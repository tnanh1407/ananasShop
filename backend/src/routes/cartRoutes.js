import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToCart,
  getCart,
  updateCartItemQty,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js"; // Giả định bạn đặt tên file controller là cart.controller.js

const router = express.Router();

// Tất cả các route giỏ hàng đều yêu cầu đăng nhập
router.use(protect);

// --- 1. Lấy giỏ hàng của người dùng hiện tại ---
// GET: /api/cart
router.get("/", getCart);

// --- 2. Thêm sản phẩm vào giỏ hàng ---
// POST: /api/cart
router.post("/", addToCart);

// --- 3. Cập nhật số lượng sản phẩm trong giỏ ---
// PUT hoặc PATCH: /api/cart/update
router.put("/update", updateCartItemQty);

// --- 4. Xóa một sản phẩm cụ thể khỏi giỏ ---
// DELETE: /api/cart/remove
// (Thông tin sản phẩm thường gửi qua req.body hoặc query)
router.delete("/remove", removeFromCart);

// --- 5. Làm trống toàn bộ giỏ hàng ---
// DELETE: /api/cart/clear
router.delete("/clear", clearCart);

export default router;
