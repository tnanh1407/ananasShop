import Product from "../models/Products.model.js";
import ProductVariant from "../models/ProductVariant.model.js";
import mongoose from "mongoose";

// --- 1. TẠO SẢN PHẨM MỚI (CREATE) ---
export const createProductController = async (req, res) => {
  try {
    const {
      nameProduct,
      category,
      description,
      priceProduct,
      statusProduct,
      materialIds,
      collectionId,
      design,
      information,
      gender,
      images,
    } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!nameProduct || !category || !priceProduct) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập tên, danh mục và giá sản phẩm!" });
    }

    const productExists = await Product.findOne({ nameProduct });
    if (productExists) {
      return res.status(400).json({ message: "Tên sản phẩm này đã tồn tại." });
    }

    const newProduct = await Product.create({
      nameProduct,
      category,
      description,
      priceProduct,
      statusProduct,
      materialIds,
      collectionId,
      design,
      information,
      gender,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Tạo sản phẩm thành công!",
      product: newProduct,
    });
  } catch (error) {
    console.error("Lỗi createProductController:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi tạo sản phẩm." });
  }
};

// --- 2. LẤY DANH SÁCH SẢN PHẨM (GET ALL + SEARCH + MULTI-FILTER) ---
export const getAllProductsController = async (req, res) => {
  try {
    const {
      keyword,
      category,
      gender,
      status,
      color,
      limit = 10,
      page = 1,
    } = req.query;
    let query = {};

    // A. Tìm kiếm theo tên sản phẩm
    if (keyword) {
      query.nameProduct = { $regex: keyword, $options: "i" };
    }

    // B. Lọc theo các thuộc tính cơ bản
    if (category && category !== "all") query.category = category;
    if (gender && gender !== "all") query.gender = gender;
    if (status) query.statusProduct = status;

    // C. Logic lọc theo MÀU SẮC (Truy vấn qua ProductVariant)
    if (color) {
      const variants = await ProductVariant.find({ colorId: color }).select(
        "productId"
      );
      const productIds = [...new Set(variants.map((v) => v.productId))];
      query._id = { $in: productIds };
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .populate("collectionId", "name") // Lấy thêm tên bộ sưu tập
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error("Lỗi getAllProductsController:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi lấy sản phẩm." });
  }
};

// --- 3. LẤY CHI TIẾT 1 SẢN PHẨM (GET BY ID + VARIANTS) ---
export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID sản phẩm không hợp lệ." });
    }

    // Lấy thông tin sản phẩm và populate các bảng liên quan
    const product = await Product.findById(id)
      .populate("collectionId")
      .populate("materialIds")
      .populate("design");

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    }

    // Lấy tất cả biến thể (Size, Màu, Kho) của sản phẩm này
    const variants = await ProductVariant.find({ productId: id })
      .populate("sizeId")
      .populate("colorId");

    res.status(200).json({
      success: true,
      product,
      variants, // Trả về kèm các biến thể để người dùng chọn Size/Màu
    });
  } catch (error) {
    console.error("Lỗi getProductByIdController:", error);
    res.status(500).json({ message: "Lỗi hệ thống." });
  }
};

// --- 4. CẬP NHẬT SẢN PHẨM (UPDATE) ---
export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để cập nhật." });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật sản phẩm thành công!",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống khi cập nhật sản phẩm." });
  }
};

// --- 5. XÓA SẢN PHẨM (DELETE) ---
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ." });
    }

    // 1. Xóa sản phẩm chính
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để xóa." });
    }

    // 2. Xóa tất cả biến thể liên quan đến sản phẩm này
    await ProductVariant.deleteMany({ productId: id });

    res.status(200).json({
      success: true,
      message: "Đã xóa sản phẩm và các biến thể liên quan thành công!",
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống khi xóa sản phẩm." });
  }
};
