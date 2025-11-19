import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

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
    console.error("Lỗi đăng nhập : ", e);
    return res.status(500).json({ message: "Đã xảy ra lỗi hệ thống" });
  }
};
