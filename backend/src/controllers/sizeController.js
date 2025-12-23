import Size from "../models/Size.model.js";
import mongoose from "mongoose";

// --- 1. TẠO SIZE MỚI (CREATE) ---
export const createSizeController = async (req, res) => {
  try {
    const { name, type, value, status } = req.body;

    // Kiểm tra các trường bắt buộc theo Model Size
    if (!name || !type) {
      return res
        .status(400)
        .json({
          message: "Vui lòng nhập đầy đủ tên và loại size (shoe/clothes)!",
        });
    }

    // Kiểm tra trùng lặp
    const sizeExists = await Size.findOne({ name });
    if (sizeExists) {
      return res
        .status(400)
        .json({ message: "Tên kích thước này đã tồn tại." });
    }

    const newSize = await Size.create({
      name,
      type,
      value,
      status: status || "active",
    });

    res.status(201).json({
      success: true,
      message: "Tạo kích thước mới thành công!",
      size: newSize,
    });
  } catch (error) {
    console.error("Lỗi trong createSizeController:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi tạo kích thước." });
  }
};

// --- 2. LẤY DANH SÁCH SIZE (GET ALL + SEARCH + FILTER) ---
export const getAllSizesController = async (req, res) => {
  try {
    const { keyword, status, type } = req.query;
    let query = {};

    // Tìm kiếm theo tên size
    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    // Lọc theo trạng thái (active/inactive)
    if (status) {
      query.status = status;
    }

    // Lọc theo loại (shoe/clothes) - Quan trọng để hiển thị đúng size cho từng loại SP
    if (type && type !== "all") {
      query.type = type;
    }

    const sizes = await Size.find(query).sort({ value: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: sizes.length,
      sizes,
    });
  } catch (error) {
    console.error("Lỗi trong getAllSizesController:", error);
    res
      .status(500)
      .json({ message: "Lỗi hệ thống khi lấy danh sách kích thước." });
  }
};

// --- 3. LẤY CHI TIẾT 1 SIZE (GET BY ID) ---
export const getSizeByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID kích thước không hợp lệ." });
    }

    const size = await Size.findById(id);
    if (!size) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy kích thước yêu cầu." });
    }

    res.status(200).json({
      success: true,
      size,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server nội bộ." });
  }
};

// --- 4. CẬP NHẬT SIZE (UPDATE) ---
export const updateSizeController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, value, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID kích thước không hợp lệ." });
    }

    const updatedSize = await Size.findByIdAndUpdate(
      id,
      { name, type, value, status },
      { new: true, runValidators: true }
    );

    if (!updatedSize) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy kích thước để cập nhật." });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật kích thước thành công!",
      size: updatedSize,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Tên kích thước bị trùng lặp." });
    }
    res.status(500).json({ message: "Lỗi hệ thống khi cập nhật." });
  }
};

// --- 5. XÓA SIZE (DELETE) ---
export const deleteSizeController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ." });
    }

    const deletedSize = await Size.findByIdAndDelete(id);

    if (!deletedSize) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy kích thước để xóa." });
    }

    res.status(200).json({
      success: true,
      message: "Đã xóa kích thước thành công!",
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống khi xóa kích thước." });
  }
};
