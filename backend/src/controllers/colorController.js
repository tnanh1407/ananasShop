import Color from "../models/Collection.model.js";
import mongoose from "mongoose";

// CRUD
export const createColorController = async (req, res) => {
  try {
    const { name, slug, hex, status } = req.body;

    if (!name || !slug || !hex) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ tên, slug và mã màu hex!" });
    }

    const colorExists = await Color.findOne({ $or: [{ name }, { slug }] });
    if (colorExists) {
      return res
        .status(400)
        .json({ message: "Tên màu hoặc Slug đã tồn tại trong hệ thống." });
    }

    const newColor = await Color.create({
      name,
      slug,
      hex,
      status: status || "active",
    });

    res.status(201).json({
      message: "Tạo màu sắc mới thành công!",
      color: newColor,
    });
  } catch (error) {
    console.error("Lỗi trong createColorController:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi tạo màu sắc." });
  }
};

// --- 2. LẤY DANH SÁCH TẤT CẢ MÀU (GET ALL) ---

export const getAllColorsController = async (req, res) => {
  try {
    const { keyword, status } = req.query;

    let query = {};

    // Tìm kiếm màu theo tên hoặc slug nếu có keyword

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },

        { slug: { $regex: keyword, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    const colors = await Color.find(query).sort({ name: 1 }); // Sắp xếp theo tên A-Z

    res.status(200).json({
      success: true,

      count: colors.length,

      colors,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

// --- 3. LẤY CHI TIẾT 1 MÀU (GET BY ID) ---

export const getColorByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID màu sắc không hợp lệ." });
    }

    const color = await Color.findById(id);
    if (!color) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy màu sắc yêu cầu." });
    }

    res.status(200).json({
      message: "Lấy thông tin màu sắc thành công!",
      color,
    });
  } catch (error) {
    console.error("Lỗi trong getColorByIdController:", error);
    res.status(500).json({ message: "Lỗi hệ thống." });
  }
};

// --- 4. CẬP NHẬT MÀU SẮC (UPDATE) ---
export const updateColorController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, hex, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID màu sắc không hợp lệ." });
    }

    const updatedColor = await Color.findByIdAndUpdate(
      id,
      { name, slug, hex, status },
      { new: true, runValidators: true }
    );

    if (!updatedColor) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy màu sắc để cập nhật." });
    }

    res.status(200).json({
      message: "Cập nhật màu sắc thành công!",
      color: updatedColor,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Tên hoặc Slug màu sắc đã bị trùng lặp." });
    }
    console.error("Lỗi trong updateColorController:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi cập nhật màu." });
  }
};

// --- 5. XÓA MÀU SẮC (DELETE) ---
export const deleteColorController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ." });
    }

    const deletedColor = await Color.findByIdAndDelete(id);

    if (!deletedColor) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy màu sắc để xóa." });
    }

    res.status(200).json({
      message: "Đã xóa màu sắc thành công!",
    });
  } catch (error) {
    console.error("Lỗi trong deleteColorController:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi xóa màu." });
  }
};
