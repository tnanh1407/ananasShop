import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Material from "../models/Material.js";
import { materials } from "./materials.seed.js";

dotenv.config();

const importData = async () => {
  try {
    // 1, Kết nối database
    await connectDB();

    // 2.Xóa dữ liệu cũ
    await Material.deleteMany();
    console.log("Đã xóa dữ liệu cũ");

    // 3.Chèn dữ liệu mới từ file materials
    await Material.insertMany(materials);
    console.log("Đã thêm dữ liệu từ file materials");

    process.exit();
  } catch (e) {
    console.log("Lỗi khi nhập dữ liệu material : ", e);
    process.exit();
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Material.deleteMany();
    console.log("Đã xóa sạch dữ liệu Material");
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
