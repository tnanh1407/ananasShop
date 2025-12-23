import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

// Import các models
import Material from "../models/Material.model.js";
import Collection from "../models/Collection.model.js";
import Design from "../models/Design.model.js";
import Color from "../models/Color.model.js";
import Product from "../models/Products.model.js";
import Size from "../models/Size.model.js";
import ProductVariant from "../models/ProductVariant.model.js";
import User from "../models/Users.js"; // Import thêm User
import Cart from "../models/cart.model.js"; // Import thêm Cart

// Import các dữ liệu cố định
import { materials } from "./materials.seed.js";
import { collections } from "./collection.seed.js";
import { colors } from "./colors.seed.js";
import { designs } from "./design.seed.js";
import { sizes } from "./size.seed.js";
import { sampleProducts } from "./products.seed.js";
import { generateSampleCarts } from "./cart.seed.js"; // Import hàm logic mới

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    // 1. Xóa toàn bộ dữ liệu cũ
    await Cart.deleteMany(); // Xóa giỏ hàng trước
    await ProductVariant.deleteMany();
    await Product.deleteMany();
    await Material.deleteMany();
    await Collection.deleteMany();
    await Design.deleteMany();
    await Color.deleteMany();
    await Size.deleteMany();

    // 2. Chèn các bảng phụ
    const createdCollections = await Collection.insertMany(collections);
    const createdMaterials = await Material.insertMany(materials);
    const createdDesigns = await Design.insertMany(designs);
    const createdColors = await Color.insertMany(colors);
    const createdSizes = await Size.insertMany(sizes);

    console.log("Đã khởi tạo xong các bảng danh mục.");

    // 3. Chuẩn bị dữ liệu Product
    const productToImport = sampleProducts.map((p, index) => ({
      ...p,
      collectionId: createdCollections[index % createdCollections.length]._id,
      design: createdDesigns[index % createdDesigns.length]._id,
    }));

    const createdProducts = await Product.insertMany(productToImport);
    console.log("Đã thêm sản phẩm mẫu.");

    // 4. Tạo Biến thể (Variants)
    const variants = [];
    createdProducts.forEach((product) => {
      let validSizes = createdSizes.filter(
        (size) => size.type === product.category
      );
      if (validSizes.length === 0)
        validSizes = createdSizes.filter((size) => size.type === "none");

      const radomMaterials = [...createdMaterials]
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      const randomColors = [...createdColors]
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

      randomColors.forEach((color) => {
        validSizes.forEach((size) => {
          radomMaterials.forEach((material) => {
            variants.push({
              productId: product._id,
              colorId: color._id,
              sizeId: size._id,
              materialIds: material,
              stock: Math.floor(Math.random() * 100) + 10,
            });
          });
        });
      });
    });
    const createdVariants = await ProductVariant.insertMany(variants);
    console.log(`Đã tạo ${createdVariants.length} biến thể.`);

    // --- 5. TẠO GIỎ HÀNG MẪU (Dựa trên User đã có sẵn trong DB) ---
    const users = await User.find();
    if (users.length > 0) {
      const carts = generateSampleCarts(users, createdVariants);
      await Cart.insertMany(carts);
      console.log(`Đã tạo giỏ hàng cho ${users.length} người dùng.`);
    } else {
      console.log(
        "Cảnh báo: Không có người dùng nào trong DB để tạo giỏ hàng mẫu."
      );
    }

    console.log("Dữ liệu đã được khởi tạo thành công!");
    process.exit();
  } catch (e) {
    console.log("Lỗi khi nhập dữ liệu : ", e);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Cart.deleteMany(); // Thêm xóa giỏ hàng vào hàm hủy dữ liệu
    await ProductVariant.deleteMany();
    await Product.deleteMany();
    await Material.deleteMany();
    await Collection.deleteMany();
    await Design.deleteMany();
    await Color.deleteMany();
    await Size.deleteMany();

    console.log("Đã xóa sạch toàn bộ dữ liệu mẫu.");
    process.exit();
  } catch (e) {
    console.error("Lỗi khi xóa dữ liệu: ", e);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
