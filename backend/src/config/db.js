import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
  } catch (e) {
    console.log("Lỗi kết nối cơ sở dữ liệu : ", e);
    process.exit(1);
  }
};
