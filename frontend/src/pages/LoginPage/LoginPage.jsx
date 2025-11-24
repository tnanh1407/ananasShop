import "./LoginPage.scss";
import LogoAnanas from "@/assets/ananas_logo.svg";
import backgroundAnanas from "@/assets/ananas_background.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div class="login-page">
      <div className="login-page__content">
        <div className="login-page__header">
          <div className="login-page__logo">
            <img src={LogoAnanas} alt="logo_ananas" />
          </div>
          <span className="login-page__title"> | ERP SYSTEM</span>
        </div>

        <form className="login-page__form">
          <div className="login-page__input-group">
            <input placeholder="Địa chỉ email" type="text" />
          </div>
          <div className="login-page__input-group login-page__password-group">
            <input
              placeholder="Mật khẩu"
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
              <input type="checkbox" /> <span>Ghi nhớ tài khoản</span>
            </div>
            <span className="login-page__forgot">
              <a href="#">Quên mật khẩu</a>
            </span>
          </div>
          <button className="login-page__btn-submit" type="submit">
            Đăng nhập
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
