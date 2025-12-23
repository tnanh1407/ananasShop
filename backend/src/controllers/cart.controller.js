import Cart from "../models/cart.model.js";
import Product from "../models/Products.model.js";
import ProductVariant from "../models/ProductVariant.model.js";
import mongoose from "mongoose";

// --- 1. THÊM VÀO GIỎ HÀNG (ADD TO CART) ---
export const addToCart = async (req, res) => {
  try {
    const { productId, variantId, qty } = req.body;
    const userId = req.user._id; // Giả định bạn đã có middleware auth để lấy userId từ token

    // Kiểm tra dữ liệu đầu vào
    if (!productId || !variantId || !qty) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp đầy đủ thông tin sản phẩm!" });
    }

    // Kiểm tra sản phẩm và biến thể có tồn tại không
    const variant = await ProductVariant.findById(variantId);
    if (!variant) {
      return res
        .status(404)
        .json({ message: "Biến thể sản phẩm không tồn tại." });
    }

    // Tìm giỏ hàng của người dùng
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Nếu đã có giỏ hàng, kiểm tra sản phẩm + biến thể này đã có trong giỏ chưa
      const itemIndex = cart.cartItems.findIndex(
        (item) =>
          item.product.toString() === productId &&
          item.variant.toString() === variantId
      );

      if (itemIndex > -1) {
        // Nếu đã tồn tại, tăng số lượng
        cart.cartItems[itemIndex].qty += Number(qty);
      } else {
        // Nếu chưa có, thêm mới vào mảng cartItems
        cart.cartItems.push({ product: productId, variant: variantId, qty });
      }
      await cart.save();
    } else {
      // Nếu người dùng chưa có giỏ hàng, tạo mới
      cart = await Cart.create({
        userId,
        cartItems: [{ product: productId, variant: variantId, qty }],
      });
    }

    res.status(200).json({
      success: true,
      message: "Đã thêm sản phẩm vào giỏ hàng!",
      cart,
    });
  } catch (error) {
    console.error("Lỗi addToCart:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi thêm vào giỏ hàng." });
  }
};

// --- 2. LẤY GIỎ HÀNG (GET USER CART) ---
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId })
      .populate({
        path: "cartItems.product",
        select: "nameProduct priceProduct images", // Chỉ lấy các trường cần thiết
      })
      .populate({
        path: "cartItems.variant",
        populate: [
          { path: "colorId", select: "nameColor" },
          { path: "sizeId", select: "nameSize" },
        ],
      });

    if (!cart) {
      return res.status(200).json({ success: true, cartItems: [] });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Lỗi getCart:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi lấy giỏ hàng." });
  }
};

// --- 3. CẬP NHẬT SỐ LƯỢNG (UPDATE QUANTITY) ---
export const updateCartItemQty = async (req, res) => {
  try {
    const { productId, variantId, qty } = req.body;
    const userId = req.user._id;

    if (qty < 1) {
      return res.status(400).json({ message: "Số lượng phải ít nhất là 1." });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng." });

    const itemIndex = cart.cartItems.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.variant.toString() === variantId
    );

    if (itemIndex > -1) {
      cart.cartItems[itemIndex].qty = Number(qty);
      await cart.save();
      res
        .status(200)
        .json({ success: true, message: "Đã cập nhật số lượng!", cart });
    } else {
      res.status(404).json({ message: "Sản phẩm không có trong giỏ hàng." });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống khi cập nhật giỏ hàng." });
  }
};

// --- 4. XÓA SẢN PHẨM KHỎI GIỎ (REMOVE ITEM) ---
export const removeFromCart = async (req, res) => {
  try {
    const { productId, variantId } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng." });

    cart.cartItems = cart.cartItems.filter(
      (item) =>
        !(
          item.product.toString() === productId &&
          item.variant.toString() === variantId
        )
    );

    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Đã xóa sản phẩm khỏi giỏ hàng.", cart });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống khi xóa sản phẩm." });
  }
};

// --- 5. XÓA SẠCH GIỎ HÀNG (CLEAR CART) ---
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    await Cart.findOneAndDelete({ userId });
    res.status(200).json({ success: true, message: "Đã làm trống giỏ hàng." });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống khi làm trống giỏ hàng." });
  }
};
