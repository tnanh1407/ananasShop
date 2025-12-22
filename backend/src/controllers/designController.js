import mongoose from "mongoose";
import Design from "../models/Design.model.js";
// --- 1. TẠO DESIGN MỚI ---

export const createDesignController = async (req, res) => {
  try {
    const { name, slug, status } = req.body;

    if (!name || !slug) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ tên, slug !" });
    }

    const designExists = await Design.findOne({ $or: [{ name }, { slug }] });
    if (designExists) {
      return res.status(400).json({
        message: "Tên kiểu dáng hoặc Slug đã tồn tại trong hệ thống.",
      });
    }

    const newDesign = await Design.create({
      name,
      slug,
      status: status || "active",
    });

    res.status(201).json({
      message: "Tạo kiểu dáng mới thành công!",
      design: newDesign,
    });
  } catch (error) {
    console.error("Lỗi trong createDesignController:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi tạo kiểu dáng." });
  }
};

// --- 2. LẤY DANH SÁCH TẤT CẢ KIỂU DÁNG (GET ALL) ---

export const getAllDesignsController = async (req, res) => {
  try {
    const { keyword, status } = req.query;

    let query = {};

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { slug: { $regex: keyword, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    const design = await Design.find(query).sort({ name: 1 }); // Sắp xếp theo tên A-Z

    res.status(200).json({
      message: "Lấy tất cả kiểu dáng  thành công!",

      count: design.length,

      design,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

// --- 3. LẤY CHI TIẾT 1 KIỂU DÁNG (GET BY ID) ---

export const getDesignByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID design không hợp lệ." });
    }

    const design = await Design.findById(id);
    if (!design) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy kiểu dáng yêu cầu." });
    }

    res.status(200).json({
      message: "Lấy thông tin kiểu dáng thành công!",
      design,
    });
  } catch (error) {
    console.error("Lỗi trong getDesignByIdController:", error);
    res.status(500).json({ message: "Lỗi hệ thống." });
  }
};

// --- 4. CẬP NHẬT KIỂU DÁNG (UPDATE) ---
export const updateDesignController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID kiểu dáng không hợp lệ." });
    }

    const updatedDesign = await Design.findByIdAndUpdate(
      id,
      { name, slug, status },
      { new: true, runValidators: true }
    );

    if (!updatedDesign) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy kiểu dáng để cập nhật." });
    }

    res.status(200).json({
      message: "Cập nhật kiểu dáng thành công!",
      Design: updatedDesign,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Tên hoặc Slug kiểu dáng đã bị trùng lặp." });
    }
    console.error("Lỗi trong updateDesignController:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi cập nhật màu." });
  }
};

// --- 5. XÓA kiểu dáng (DELETE) ---
export const deleteDesignController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ." });
    }

    const deletedDesign = await Design.findByIdAndDelete(id);

    if (!deletedDesign) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy kiểu dáng để xóa." });
    }

    res.status(200).json({
      message: "Đã xóa kiểu dáng thành công!",
    });
  } catch (error) {
    console.error("Lỗi trong deleteDesignController:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi xóa màu." });
  }
};
