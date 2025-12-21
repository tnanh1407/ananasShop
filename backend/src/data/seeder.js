import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

// import các dữ liệu models Schema
import Material from "../models/Material.model.js";
import Collection from "../models/Collection.model.js";
import Design from "../models/Design.model.js";
import Color from "../models/Color.model.js";
import Product from "../models/Products.model.js";
import Size from "../models/Size.model.js";

// import các dữ liệu cố định
import { materials } from "./materials.seed.js";
import { collections } from "./collection.seed.js";
import { colors } from "./colors.seed.js";
import { designs } from "./design.seed.js";
import { sizes } from "./size.seed.js";
import { sampleProducts } from "./products.seed.js";
import ProductVariant from "../models/ProductVariant.model.js";

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    // 1. Xóa toàn bộ dữ liệu cũ
    await ProductVariant.deleteMany();
    await Product.deleteMany();
    await Material.deleteMany();
    await Collection.deleteMany();
    await Design.deleteMany();
    await Color.deleteMany();
    await Size.deleteMany();

    // 2. Chèn các bảng phụ và lấy lại danh sách đã chèn để có ID
    const createdCollections = await Collection.insertMany(collections);
    const createdMaterials = await Material.insertMany(materials);
    const createdDesigns = await Design.insertMany(designs);
    const createdColors = await Color.insertMany(colors);
    const createdSizes = await Size.insertMany(sizes);

    console.log("Đã khởi tạo xong các bảng danh mục.");

    // 3. Chuẩn bị dữ liệu Product với các ID thực tế
    const productToImport = sampleProducts.map((p, index) => {
      return {
        ...p,
        collectionId: createdCollections[index % createdCollections.length]._id,
        design: createdDesigns[index % createdDesigns.length]._id,
      };
    });

    const createdProducts = await Product.insertMany(productToImport);
    console.log("Đã thêm  sản phẩm mẫu.");

    // 4. Tạo Biến thể (Variants) để giải quyết vấn đề nhiều Màu/Size
    const variants = [];
    createdProducts.forEach((product) => {
      let validSizes = createdSizes.filter(
        (size) => size.type === product.category
      );

      if (validSizes.length === 0) {
        validSizes = createdSizes.filter((size) => size.type === "none");
      }

      const radomMaterials = [...createdMaterials]
        .sort(() => 0.5 - Math.random()) // Trộn ngẫu nhiên danh sách màu
        .slice(0, Math.floor(Math.random() * 3) + 1); // Lấy ngẫu nhiên 1, 2 hoặc 3 màu

      const randomColors = [...createdColors]
        .sort(() => 0.5 - Math.random()) // Trộn ngẫu nhiên danh sách màu
        .slice(0, Math.floor(Math.random() * 3) + 1); // Lấy ngẫu nhiên 1, 2 hoặc 3 màu

      randomColors.forEach((color) => {
        validSizes.forEach((size) => {
          radomMaterials.forEach((material) => {
            variants.push({
              productId: product._id,
              colorId: color._id,
              sizeId: size._id,
              materialIds: material,
              stock: Math.floor(Math.random() * 100) + 10, // Tồn kho ngẫu nhiên 10-110
            });
          });
        });
      });
    });
    await ProductVariant.insertMany(variants);
    console.log(`Đã tạo ${variants.length} biến thể cho các sản phẩm`);

    console.log("Dữ liệu đã được khởi tạo thành công!");
    process.exit();
  } catch (e) {
    console.log("Lỗi khi nhập dữ liệu : ", e);
    process.exit();
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Material.deleteMany();
    await Collection.deleteMany();
    await Design.deleteMany();
    await Color.deleteMany();
    await Size.deleteMany();
    await Product.deleteMany();
    await ProductVariant.deleteMany();
    console.log("Đã xóa sạch dữ liệu Material và Collection");
    process.exit();
  } catch (e) {
    console.error("Lỗi khi xóa dữ liệu: ", error);
    process.exit(1);
  }
};

// Kiểm tra tham số từ dòng lệnh để quyết định hành động

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
