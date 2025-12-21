import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ananasShop/products",
    allowed_formats: ["jpg", "png"],
  },
});

const userStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const userId = req.user._id;
    return {
      folder: `ananasShop/users/${userId}`,
      puglic_id: `avatar_${Date.now()}`,
      allowed_formats: ["jpg", "png"],
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    };
  },
});

export const uploadProduct = multer({ storage: productStorage });
export const uploadUser = multer({ storage: userStorage });
