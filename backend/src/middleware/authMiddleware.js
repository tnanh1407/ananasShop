import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export const protect = async (req, res, next) => {
  let token;

  // ƯU TIÊN 1: Kiểm tra Header Authorization (Dành cho Mobile / Postman)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Lấy token từ chuỗi "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];
    } catch (error) {
      console.error("Lỗi lấy token từ header:", error);
    }
  }

  // ƯU TIÊN 2: Nếu không có header, kiểm tra Cookie (Dành cho Web)
  if (!token && req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // Tiến hành xác thực
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Không tìm thấy người dùng." });
      }

      next();
    } catch (error) {
      console.error(error);
      res
        .status(401)
        .json({ message: "Token không hợp lệ (Hết hạn hoặc sai)." });
    }
  } else {
    res.status(401).json({ message: "Bạn chưa đăng nhập (Thiếu Token)." });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    res.status(403).json({ message: "Bạn không có quyền Admin" });
  }
};
