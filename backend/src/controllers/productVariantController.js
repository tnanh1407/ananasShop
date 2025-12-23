import ProductVariant from "../models/ProductVariant.model.js";
import mongoose from "mongoose";

// --- 1. TẠO BIẾN THỂ MỚI (CREATE) ---
export const createVariantController = async (req, res) => {
  try {
    const { productId, sizeId, colorId, stock, price } = req.body;

    // Kiểm tra tính hợp lệ của ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "ID sản phẩm không hợp lệ." });
    }

    // Kiểm tra xem biến thể này đã tồn tại chưa (tránh trùng lặp cùng 1 sp, 1 size, 1 màu)
    const variantExists = await ProductVariant.findOne({
      productId,
      sizeId,
      colorId,
    });
    if (variantExists) {
      return res
        .status(400)
        .json({ message: "Biến thể với Size và Màu này đã tồn tại." });
    }

    const newVariant = await ProductVariant.create({
      productId,
      sizeId,
      colorId,
      stock: stock || 0,
      price: price ?? null,
    });

    res.status(201).json({
      success: true,
      message: "Thêm biến thể sản phẩm thành công!",
      variant: newVariant,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi hệ thống khi tạo biến thể.",
      error: error.message,
    });
  }
};

// --- 2. LẤY TẤT CẢ BIẾN THỂ CỦA 1 SẢN PHẨM (READ) ---
export const getVariantsByProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "ID sản phẩm không hợp lệ." });
    }

    const variants = await ProductVariant.find({ productId })
      .populate("sizeId", "name")
      .populate("colorId", "name hex");

    res.status(200).json({
      success: true,
      count: variants.length,
      variants,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách biến thể." });
  }
};

// --- 3. CẬP NHẬT BIẾN THỂ (UPDATE - Chủ yếu là cập nhật kho hàng) ---
export const updateVariantController = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock, sizeId, colorId, price } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID biến thể không hợp lệ." });
    }

    const updatedVariant = await ProductVariant.findByIdAndUpdate(
      id,
      { stock, sizeId, colorId, price: price ?? null },
      { new: true, runValidators: true }
    );

    if (!updatedVariant) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy biến thể để cập nhật." });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật biến thể thành công!",
      variant: updatedVariant,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống khi cập nhật biến thể." });
  }
};

// --- 4. XÓA BIẾN THỂ (DELETE) ---
export const deleteVariantController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ." });
    }

    const deletedVariant = await ProductVariant.findByIdAndDelete(id);

    if (!deletedVariant) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy biến thể để xóa." });
    }

    res.status(200).json({
      success: true,
      message: "Đã xóa biến thể thành công!",
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống khi xóa biến thể." });
  }
};

// --- 5  LẤY CHI TIẾT 1 BIẾN THỂ (GET BY ID) ---
export const getVariantByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Kiểm tra tính hợp lệ của ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID biến thể không hợp lệ." });
    }

    // 2. Tìm biến thể và lấy thêm thông tin chi tiết từ các bảng liên quan
    const variant = await ProductVariant.findById(id)
      .populate("productId", "nameProduct images") // Lấy tên và ảnh sản phẩm chính
      .populate("sizeId", "name value") // Lấy tên size (ví dụ: 42)
      .populate("colorId", "name hex"); // Lấy tên màu và mã màu

    if (!variant) {
      return res.status(404).json({ message: "Không tìm thấy biến thể này." });
    }

    res.status(200).json({
      success: true,
      variant,
    });
  } catch (error) {
    console.error("Lỗi getVariantByIdController:", error);
    res
      .status(500)
      .json({ message: "Lỗi hệ thống khi lấy thông tin biến thể." });
  }
};
