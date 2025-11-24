import "./RegisterPage.scss";
import LogoAnanas from "@/assets/ananas_logo.svg";
import backgroundAnanas from "@/assets/ananas_background.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
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

        <form className="register-page__form">
          <div className="register-page__input-group">
            <input placeholder="Nhập họ và tên của bạn" type="text" />
          </div>
          <div className="register-page__input-group">
            <input placeholder="Địa chỉ email" type="text" />
          </div>
          <div className="register-page__input-group register-page__password-group">
            <input
              placeholder="Mật khẩu"
              type={showPassword ? "text" : "password"}
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
              <input type="checkbox" />{" "}
              <span>Bạn có đồng ý điều khoản trên không</span>
            </div>
            {/* <span className="register-page__forgot">
              <a href="#">Quên mật khẩu</a>
            </span> */}
          </div>
          <button className="register-page__btn-submit" type="submit">
            Đăng nhập
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
