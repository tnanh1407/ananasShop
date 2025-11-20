import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// FUNCTION REGISTER
export const registerUserController = async (req, res) => {
  const { fullname, email, password, username } = req.body;

  try {
    // 1. Kiểm tra xem trường bắt buộc đã được nhập chưa
    if (!fullname || !email || !password || !username) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin trường bắt buộc !" });
    }

    // 2. Kiểm tra xem người dùng đã tồn tại chưa
    const userExists = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username }],
    });

    if (userExists) {
      if (userExists.email === email.toLowerCase()) {
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
      res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }
  } catch (e) {
    console.error("Lỗi Đăng ký:", e);
    return res
      .status(500)
      .json({ message: "Lỗi server nội bộ. Vui lòng thử lại sau." });
  }
};

// function login
export const loginUserController = async (req, res) => {
  const { accountIdentifier, password } = req.body;

  // 1. Kiểm tra dữ liệu đầu vào cơ bản
  if (!accountIdentifier || !password) {
    return res
      .status(400)
      .json({ message: "Vui lòng nhập đầy đủ Tài khoản và mật khẩu" });
  }

  try {
    // 2. Định nghĩa các điều kiện tìm kiếm, truy vấn với phần tử $or
    const findConditions = [
      // Email luôn chuyển sang chữ thường để đảm bảo tìm kiếm không phân biệt hoa/thường
      { email: accountIdentifier.toLowerCase() },
      // Username giữ nguyên vì thường là case-sensitive
      { username: accountIdentifier },
    ];

    const user = await User.findOne({ $or: findConditions });

    // 3. Kiểm tra sự tồn tại của người dùng
    if (!user) {
      return res.status(401).json({
        // Nên gộp thông báo lỗi để tránh người dùng dò ra được email/username đã tồn tại hay chưa
        message:
          "Thông tin đăng nhập không hợp lệ (Tài khoản hoặc Mật khẩu không đúng)",
      });
    }

    // 4. Kiểm tra mật khẩu (Bắt buộc)
    // Lưu ý: Cần import thư viện 'bcrypt' (hoặc tương đương)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        // Sử dụng cùng một thông báo lỗi như trên để tăng bảo mật
        message:
          "Thông tin đăng nhập không hợp lệ (Tài khoản hoặc Mật khẩu không đúng)",
      });
    }

    // 5. Đăng nhập thành công!
    // Lưu ý: Cần định nghĩa hàm 'generateToken'
    return res.status(200).json({
      message: "Đăng nhập thành công!",
      user: user,
      token: generateToken(user._id),
    });
  } catch (e) {
    // Sửa: Thay 'error' bằng 'e'
    console.error("Error Function Login : ", e);
    return res.status(500).json({ message: "Đã xảy ra lỗi hệ thống" });
  }
};

// CRUD
export const getAllUsersController = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({
      message: "Lấy danh sách người dùng thành công !",
      user: user,
      count: user.length,
    });
  } catch (error) {
    console.log("Error Function GetAllUsers : ", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi hệ thống" });
  }
};

export const getByIdUserController = async (req, res) => {
  try {
    // 1 . check xem người dùng đã tồn tại chưa
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(404).json({ message: ` Không tồn tại trong CSDL` });
    }
    res.status(200).json({
      message: `Lấy người dùng với _id ${user._id}  thành công !`,
      user: user,
    });
  } catch (error) {
    console.log("Error Function getByIdUser : ", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi hệ thống" });
  }
};

export const updateUserController = async (req, res) => {
  // 1. lấy ID và URL Parameters và dữ liệu cập nhật từ body
  const { id } = req.params;
  const updateData = req.body;

  // 2. Check Xem có dữ liệu nào được cập nhật hay không ?

  if (Object.keys(updateData).length === 0) {
    return res
      .status(400)
      .json({ message: "Không có dữ liệu nào cung cấp để cập nhật !" });
  }
  try {
    // 3. Kiểm tra xem dữ liệu id có hợp  lệ hay không ?
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID nguời dùng không hợp lệ" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    //  4. Kiểm tra sự tồn tại của người dùng

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
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Dữ liệu cập nhật không hợp lệ", error: e.message });
    }
    console.error("Lỗi người dùng cập nhật ", e);
    return res.status(500).json({ message: "Đã xảy ra lỗi hệ thống " });
  }
};

// 4. DELETE (Xóa sản phẩm theo ID)
export const deleteUserController = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy người dùng để xóa " });
    }
    res
      .status(200)
      .json({ message: "Xoá sản phẩm thành công ", user: deletedUser });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi sản phẩm",
      error: `Lỗi function deleteUserController ${error.message}`,
    });
  }
};

export const logoutUserController = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({
      message: "Đăng xuất thành công. Token đã được xóa khỏi Cookie.",
    });
  } catch (error) {
    console.error("Lỗi đăng xuất:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi hệ thống khi xử lý đăng xuất." });
  }
};
