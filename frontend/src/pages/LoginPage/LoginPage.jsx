import "./LoginPage.scss";
import LogoAnanas from "@/assets/ananas_logo.svg";
import backgroundAnanas from "@/assets/ananas_background.png";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { loginUser } from "../../api/userAPI";
import { setCredentials } from "../../features/auth/authSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    accountIdentifier: "",
    password: "",
  });

  const [isRemember, setIsRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedAccount = localStorage.getItem("savedAccountIndentifier");
    if (savedAccount) {
      setFormData((prev) => ({
        ...prev,
        accountIdentifier: savedAccount,
      }));
      setIsRemember(true);
    }
  }, []);

  const handleToogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // 2. Hàm xử lí input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // 3 Hàm xử lí submit  form

  const handleLogin = async (e) => {
    e.preventDefault();
    // Ngăn Reload trang

    if (isRemember) {
      localStorage.getItem("savedAccountIndentifier", identifier);
    } else {
      localStorage.removeItem("savedAccountIndentifier");
    }
    const identifier = formData.accountIdentifier.trim();
    const pass = formData.password.trim();

    // 2. Kiểm tra rỗng
    if (!identifier || !pass) {
      toast.error("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
      return;
    }

    // 3. Kiểm tra độ dài mật khẩu (Backend quy định min 6 ký tự)
    if (pass.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    setIsLoading(true);
    try {
      // Gọi API
      // await new Promise((resolve) => setTimeout(resolve, 20000));
      const data = await loginUser(formData);

      // Dispatch action lưu user vào Redux Strore
      //  Backend trả về token , message , user
      dispatch(setCredentials({ user: data.user }));
      toast.success("Đăng nhập thành công !");
      //  Chuyển hướng về homePage
      navigate("/");
    } catch (e) {
      console.error("🔴 Lỗi đăng nhập:", e);
      // Lấy lỗi từ message từ error object
      const errorMessage = e.errorMessage || "Đăng nhập thất bại";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login-page">
      <div className="login-page__content">
        <div className="login-page__header">
          <div className="login-page__logo">
            <img src={LogoAnanas} alt="logo_ananas" />
          </div>
          <span className="login-page__title"> | ERP SYSTEM</span>
        </div>

        <form className="login-page__form" onSubmit={handleLogin}>
          <div className="login-page__input-group">
            <input
              name="accountIdentifier"
              placeholder="Nhập địa chỉ email hoặc tên đăng nhập"
              type="text"
              value={formData.accountIdentifier}
              onChange={handleChange}
            />
          </div>
          <div className="login-page__input-group login-page__password-group">
            <input
              onChange={handleChange}
              name="password"
              value={formData.password}
              placeholder="Nhập mật khẩu của bạn"
              type={showPassword ? "text" : "password"}
            />
            <span
              className="login-page__toggle-icon"
              onClick={handleToogglePassword}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </div>
          <div className="login-page__actions">
            <div className="login-page__remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={isRemember}
                onChange={(e) => e.setIsRemember(e.target.checked)}
              />{" "}
              <label htmlFor="remember-me">Ghi nhớ tài khoản</label>
            </div>
            <Link to="/forgot" className="login-page__forgot">
              Quên mật khẩu
            </Link>
          </div>
          <button
            className="login-page__btn-submit"
            type="submit"
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
          <Link to="/register" className="login-page__btn-register">
            Đăng kí
          </Link>
        </form>
        <p className="login-page__coppy-right">
          Copyright © 2022 Ananas. All rights reserved.
        </p>
      </div>

      <div className="login-page__banner">
        <img src={backgroundAnanas} alt="background"></img>
      </div>
    </div>
  );
};

export default LoginPage;
