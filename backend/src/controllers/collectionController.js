import Collection from "../models/Collection.model.js";
import mongoose from "mongoose";

// --- 1. TẠO BỘ SƯU TẬP MỚI (CREATE) ---
export const createCollectionController = async (req, res) => {
  try {
    const { name, slug, status } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!name || !slug) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ tên và slug bộ sưu tập!" });
    }

    // Kiểm tra trùng lặp tên hoặc slug
    const collectionExists = await Collection.findOne({
      $or: [{ name }, { slug }],
    });
    if (collectionExists) {
      return res
        .status(400)
        .json({ message: "Tên bộ sưu tập hoặc Slug đã tồn tại." });
    }

    const newCollection = await Collection.create({
      name,
      slug,
      status: status || "active",
    });

    res.status(201).json({
      success: true,
      message: "Tạo bộ sưu tập thành công!",
      collection: newCollection,
    });
  } catch (error) {
    console.error("Lỗi trong createCollectionController:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi tạo bộ sưu tập." });
  }
};

// --- 2. LẤY DANH SÁCH BỘ SƯU TẬP (GET ALL + SEARCH + FILTER) ---
export const getAllCollectionsController = async (req, res) => {
  try {
    const { keyword, status } = req.query;
    let query = {};

    // Tìm kiếm theo tên hoặc slug
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { slug: { $regex: keyword, $options: "i" } },
      ];
    }

    // Lọc theo trạng thái active/inactive
    if (status) {
      query.status = status;
    }

    const collections = await Collection.find(query).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: collections.length,
      collections,
    });
  } catch (error) {
    console.error("Lỗi trong getAllCollectionsController:", error);
    res
      .status(500)
      .json({ message: "Lỗi hệ thống khi lấy danh sách bộ sưu tập." });
  }
};

// --- 3. LẤY CHI TIẾT 1 BỘ SƯU TẬP (GET BY ID) ---
export const getCollectionByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID bộ sưu tập không hợp lệ." });
    }

    const collection = await Collection.findById(id);
    if (!collection) {
      return res.status(404).json({ message: "Không tìm thấy bộ sưu tập." });
    }

    res.status(200).json({
      success: true,
      collection,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server nội bộ." });
  }
};

// --- 4. CẬP NHẬT BỘ SƯU TẬP (UPDATE) ---
export const updateCollectionController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID bộ sưu tập không hợp lệ." });
    }

    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      { name, slug, status },
      { new: true, runValidators: true }
    );

    if (!updatedCollection) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy dữ liệu để cập nhật." });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật bộ sưu tập thành công!",
      collection: updatedCollection,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Tên hoặc Slug bộ sưu tập bị trùng lặp." });
    }
    res.status(500).json({ message: "Lỗi hệ thống khi cập nhật." });
  }
};

// --- 5. XÓA BỘ SƯU TẬP (DELETE) ---
export const deleteCollectionController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ." });
    }

    const deletedCollection = await Collection.findByIdAndDelete(id);

    if (!deletedCollection) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bộ sưu tập để xóa." });
    }

    res.status(200).json({
      success: true,
      message: "Đã xóa bộ sưu tập thành công!",
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống khi xóa bộ sưu tập." });
  }
};
