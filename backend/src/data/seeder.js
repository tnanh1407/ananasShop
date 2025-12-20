import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

// import các dữ liệu models Schema
import Material from "../models/Material.js";
import Collection from "../models/Collection.model.js";
import Design from "../models/Design.model.js";
import Color from "../models/Color.model.js";

// import các dữ liệu cố định
import { materials } from "./materials.seed.js";
import { collections } from "./collection.seed.js";
import { colors } from "./colors.seed.js";
import { designs } from "./design.seed.js";
import Size from "../models/Size.model.js";
import { sizes } from "./size.seed.js";
dotenv.config();

const importData = async () => {
  try {
    // 1, Kết nối database
    await connectDB();

    // 2.Xóa dữ liệu cũ
    await Material.deleteMany();
    await Collection.deleteMany();
    await Design.deleteMany();
    console.log("Đã xóa dữ liệu cũ (Materials & Collections & Design)");

    // 3.Chèn dữ liệu mới từ file materials
    await Collection.insertMany(collections);
    console.log("Đã thêm dữ liệu từ file collections.seed.js");

    await Material.insertMany(materials);
    console.log("Đã thêm dữ liệu từ file materials.seed.js");

    await Design.insertMany(designs);
    console.log("Đã thêm dữ liệu từ file design.seed.js");

    await Color.insertMany(colors);
    console.log("Đã thêm dữ liệu từ file color.seed.js");

    await Size.insertMany(sizes);
    console.log("Đã thêm dữ liệu từ file size.seed.js");

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
