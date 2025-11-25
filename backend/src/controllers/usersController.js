import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// --- FUNCTION REGISTER ---
export const registerUserController = async (req, res) => {
  const { fullname, password, username } = req.body;
  const email = req.body.email ? req.body.email.toLowerCase() : null;

  try {
    // 1. Kiểm tra xem trường bắt buộc đã được nhập chưa
    if (!fullname || !email || !password || !username) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin trường bắt buộc !" });
    }

    // 2. Kiểm tra xem người dùng đã tồn tại chưa
    const userExists = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (userExists) {
      if (userExists.email === email) {
        return res.status(400).json({ message: "Email đã được đăng ký." });
      }
      if (userExists.username === username) {
        return res.status(400).json({ message: "Username đã được sử dụng." });
      }
    }

    // 3 hash mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4 Tạo người dùng mới
    const user = await User.create({
      fullname,
      email,
      username,
      password: hashedPassword,
    });

    if (user) {
      const token = generateToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Tự động tắt bảo mật HTTPS khi chạy ở máy local để không bị lỗi
        sameSite: "strict", // Chống trang web khác mượn danh tính người dùng
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        token: token,
      });
    }
  } catch (e) {
    console.error("Lỗi Đăng ký:", e);
    return res
      .status(500)
      .json({ message: "Lỗi server nội bộ. Vui lòng thử lại sau." });
  }
};

// --- FUNCTION LOGIN ---
export const loginUserController = async (req, res) => {
  const { accountIdentifier, password } = req.body;

  // 1. Kiểm tra dữ liệu đầu vào cơ bản
  if (!accountIdentifier || !password) {
    return res
      .status(400)
      .json({ message: "Vui lòng nhập đầy đủ Tài khoản và mật khẩu" });
  }

  try {
    // 2. Định nghĩa các điều kiện tìm kiếm
    const findConditions = [
      // Email luôn chuyển sang chữ thường để đảm bảo tìm kiếm không phân biệt hoa/thường
      { email: accountIdentifier.toLowerCase() },
      { username: accountIdentifier },
    ];

    const user = await User.findOne({ $or: findConditions });

    if (user && (await bcrypt.compare(password, user.password))) {
      const userResponse = user.toObject();
      delete userResponse.password;

      const token = generateToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
      });

      return res.status(200).json({
        message: "Đăng nhập thành công !",
        user: userResponse,
        token: token,
      });
    } else {
      return res.status(401).json({
        message:
          "Thông tin đăng nhập không hợp lệ (Tài khoản hoặc Mật khẩu sai)",
      });
    }
  } catch (e) {
    console.error("Error Function Login : ", e);
    return res.status(500).json({ message: "Đã xảy ra lỗi hệ thống" });
  }
};

// --- CRUD: GET ALL ---
export const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      message: "Lấy danh sách người dùng thành công !",
      user: users,
      count: users.length,
    });
  } catch (error) {
    console.log("Error Function GetAllUsers : ", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi hệ thống" });
  }
};

// --- CRUD: GET BY ID ---
export const getByIdUserController = async (req, res) => {
  try {
    // 1. check xem id người dùng có hợp lệ không ?
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "ID nguời dùng không hợp lệ" });
    }
    // 2 . check xem người dùng đã tồn tại chưa
    const user = await User.findOne({ _id: req.params.id }).select("-password");
    if (!user) {
      return res.status(404).json({ message: `Không tồn tại trong CSDL` });
    }
    res.status(200).json({
      message: `Lấy người dùng thành công !`,
      user: user,
    });
  } catch (error) {
    console.log("Error Function getByIdUser : ", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi hệ thống" });
  }
};

// --- CRUD: UPDATE ---
export const updateUserController = async (req, res) => {
  // 1. lấy ID và URL Parameters và dữ liệu cập nhật từ body
  const { id } = req.params;
  const { fullname, email, username } = req.body;

  // 2. Check Xem có dữ liệu nào được cập nhật hay không ?
  if (!fullname && !email && !username) {
    return res
      .status(400)
      .json({ message: "Không có dữ liệu nào cung cấp để cập nhật !" });
  }
  try {
    // 3. Kiểm tra xem dữ liệu id có hợp lệ hay không ?
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID nguời dùng không hợp lệ" });
    }

    // 4 Giới hạn những dữ liệu người dùng có thể update
    const updateData = { fullname, email, username };
    // Xóa những trường không gửi nên => undefined
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    // 4. Kiểm tra sự tồn tại của người dùng
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy người dùng để cập nhật !" });
    }

    // 5. trả về phản hồi thành công
    return res.status(200).json({
      message: "Cập nhật thông tin người dùng thành công",
      user: updatedUser,
    });
  } catch (e) {
    if (e.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Dữ liệu cập nhật không hợp lệ", error: e.message });
    }
    console.error("Lỗi người dùng cập nhật ", e);
    return res.status(500).json({ message: "Đã xảy ra lỗi hệ thống " });
  }
};

// --- CRUD: DELETE ---
export const deleteUserController = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy người dùng để xóa " });
    }
    res.status(200).json({ message: "Xoá sản phẩm thành công " });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi hệ thống",
      error: `Lỗi function deleteUserController ${error.message}`,
    });
  }
};

// --- LOGOUT ---
export const logoutUserController = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0), // Hết hạn ngay lập tức
    });

    return res.status(200).json({
      message: "Đăng xuất thành công!",
    });
  } catch (error) {
    console.error("Lỗi đăng xuất:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi hệ thống khi xử lý đăng xuất." });
  }
};

// --- GET USER PROFILE ---
export const getProfileUserController = async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        role: user.role,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
