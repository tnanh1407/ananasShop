import Cart from "../models/cart.model.js";
import mongoose from "mongoose";
import Promotion from "../models/promotion.model.js";
import ProductVariant from "../models/ProductVariant.model.js";

export const checkoutPreviewController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { promotionId } = req.body;
    const cart = await Card.findOne({ userId })
      .populate("cartItems.product")
      .populate("cartItems.variant");

    if (!cart || cart.cartItems.length === 0) {
      return res.status(400).json({
        message: "Giỏ hàng bị trống ",
      });
    }
    let itemsPrice = 0;
    const previewItems = [];

    for (const item of cartItems) {
      const { variantId, qty } = item;
      const variant = await ProductVariant.findById(variantId);
      if (!variant) {
        return res.status(400).json({ message: "Không tìm thấy biến thể" });
      }

      if (qty > variant.stock) {
        return res.status(400).json({ message: "Số lượng " });
      }
    }
  } catch (e) {}
};
