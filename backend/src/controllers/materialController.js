import Material from "../models/Material.model.js";
import mongoose from "mongoose";

// --- 1. TẠO CHẤT LIỆU MỚI (CREATE) ---
export const createMaterialController = async (req, res) => {
  try {
    const { name, slug, status } = req.body;

    // Kiểm tra các trường bắt buộc theo Model
    if (!name || !slug) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ tên và slug chất liệu!" });
    }

    // Kiểm tra trùng lặp
    const materialExists = await Material.findOne({
      $or: [{ name }, { slug }],
    });
    if (materialExists) {
      return res
        .status(400)
        .json({ message: "Tên chất liệu hoặc Slug đã tồn tại." });
    }

    const newMaterial = await Material.create({
      name,
      slug,
      status: status || "active",
    });

    res.status(201).json({
      success: true,
      message: "Tạo chất liệu thành công!",
      material: newMaterial,
    });
  } catch (error) {
    console.error("Lỗi trong createMaterialController:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi tạo chất liệu." });
  }
};

// --- 2. LẤY DANH SÁCH CHẤT LIỆU (GET ALL + SEARCH + FILTER) ---
export const getAllMaterialsController = async (req, res) => {
  try {
    const { keyword, status } = req.query;
    let query = {};

    // Logic tìm kiếm theo từ khóa tương tự ColorController
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { slug: { $regex: keyword, $options: "i" } },
      ];
    }

    // Lọc theo trạng thái (active/inactive)
    if (status) {
      query.status = status;
    }

    const materials = await Material.find(query).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: materials.length,
      materials,
    });
  } catch (error) {
    console.error("Lỗi trong getAllMaterialsController:", error);
    res
      .status(500)
      .json({ message: "Lỗi hệ thống khi lấy danh sách chất liệu." });
  }
};

// --- 3. LẤY CHI TIẾT 1 CHẤT LIỆU (GET BY ID) ---
export const getMaterialByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID chất liệu không hợp lệ." });
    }

    const material = await Material.findById(id);
    if (!material) {
      return res.status(404).json({ message: "Không tìm thấy chất liệu." });
    }

    res.status(200).json({
      success: true,
      material,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server nội bộ." });
  }
};

// --- 4. CẬP NHẬT CHẤT LIỆU (UPDATE) ---
export const updateMaterialController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID chất liệu không hợp lệ." });
    }

    const updatedMaterial = await Material.findByIdAndUpdate(
      id,
      { name, slug, status },
      { new: true, runValidators: true }
    );

    if (!updatedMaterial) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy chất liệu để cập nhật." });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật thành công!",
      material: updatedMaterial,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Tên hoặc Slug chất liệu bị trùng." });
    }
    res.status(500).json({ message: "Lỗi hệ thống khi cập nhật." });
  }
};

// --- 5. XÓA CHẤT LIỆU (DELETE) ---
export const deleteMaterialController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ." });
    }

    const deletedMaterial = await Material.findByIdAndDelete(id);

    if (!deletedMaterial) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy chất liệu để xóa." });
    }

    res.status(200).json({
      success: true,
      message: "Đã xóa chất liệu thành công!",
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống khi xóa chất liệu." });
  }
};
