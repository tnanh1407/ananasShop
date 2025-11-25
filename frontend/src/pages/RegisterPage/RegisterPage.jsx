import "./RegisterPage.scss";
import LogoAnanas from "@/assets/ananas_logo.svg";
import backgroundAnanas from "@/assets/ananas_background.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerUser } from "../../api/userAPI";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Hàm xử lí nhập dữ liệu
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // hàm xử lí refister
  const handleRegister = async (e) => {
    e.preventDefault();
    const { fullname, email, username, password, confirmPassword } = formData;

    // --- VALIDATE DATA ---

    // Kiểm tra rỗng
    if (!fullname || !email || !username || !password || !confirmPassword) {
      toast.error("Vui lòng điền đầy đủ tất cả thông tin!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ!");
      return;
    }

    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);

    try {
      const dataToSend = { fullname, email, username, password };
      await registerUser(dataToSend);
      toast.success("Đăng kí thành công ! Vui lòng chuyển sang đăng nhập");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      const msg = error.message || "Đăng ký thất bại, vui lòng thử lại!";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };
  // Hàm xử lí hiện icon
  const handleToogglePassword = (setterFunction, value) => {
    setterFunction(!value);
  };

  return (
    <div class="register-page">
      <div className="register-page__content">
        <div className="register-page__header">
          <div className="register-page__logo">
            <img src={LogoAnanas} alt="logo_ananas" />
          </div>
          <span className="register-page__title"> | ERP SYSTEM</span>
        </div>

        <form className="register-page__form" onSubmit={handleRegister}>
          {/* HỌ VÀ TÊN */}
          <div className="register-page__input-group">
            <input
              placeholder="Nhập họ và tên của bạn"
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>
          {/* ĐỊA CHỈ MAIL */}
          <div className="register-page__input-group">
            <input
              placeholder="Địa chỉ email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* Username */}
          <div className="register-page__input-group">
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Tên đăng nhập (Username)"
              type="text"
            />
          </div>
          <div className="register-page__input-group register-page__password-group">
            {/* MẬT KHẨU */}
            <input
              placeholder="Mật khẩu"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              name="password"
              value={formData.password}
            />
            <span
              className="register-page__toggle-icon"
              onClick={() =>
                handleToogglePassword(setShowPassword, showPassword)
              }
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </div>
          <div className="register-page__input-group register-page__password-group">
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu của bạn"
              type={showPassword2 ? "text" : "password"}
            />
            <span
              className="register-page__toggle-icon"
              onClick={() =>
                handleToogglePassword(setShowPassword2, showPassword2)
              }
            >
              {showPassword2 ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </div>
          <div className="register-page__actions">
            <div className="register-page__remember">
              <input type="checkbox" required />{" "}
              <span>Bạn có đồng ý điều khoản trên không</span>
            </div>
            {/* <span className="register-page__forgot">
              <a href="#">Quên mật khẩu</a>
            </span> */}
          </div>
          <button
            className="register-page__btn-submit"
            type="submit"
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Đang xử lý..." : "Đăng kí"}
          </button>
          <Link to="/login" className="register-page__btn-register">
            Chuyển sang đăng nhập
          </Link>
        </form>
        <p className="register-page__coppy-right">
          Copyright © 2022 Ananas. All rights reserved.
        </p>
      </div>

      <div className="register-page__banner">
        <img src={backgroundAnanas} alt="background"></img>
      </div>
    </div>
  );
};

export default RegisterPage;
