import "./ForgotPage.scss";
import LogoAnanas from "@/assets/ananas_logo.svg";
import backgroundAnanas from "@/assets/ananas_background.png";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPage = () => {
  return (
    <div class="forgot-page">
      <div className="forgot-page__content">
        <div className="forgot-page__header">
          <div className="forgot-page__logo">
            <img src={LogoAnanas} alt="logo_ananas" />
          </div>
          <span className="forgot-page__title"> | ERP SYSTEM</span>
        </div>

        <form className="forgot-page__form">
          <div className="forgot-page__input-group">
            <input placeholder="Địa chỉ email" type="text" />
          </div>
          <button className="forgot-page__btn-submit" type="submit">
            Đăng nhập
          </button>
          <Link to="/login" className="forgot-page__btn-forgot">
            Chuyển sang đăng nhập
          </Link>
        </form>
        <p className="forgot-page__coppy-right">
          Copyright © 2022 Ananas. All rights reserved.
        </p>
      </div>

      <div className="forgot-page__banner">
        <img src={backgroundAnanas} alt="background"></img>
      </div>
    </div>
  );
};

export default ForgotPage;
