import "./LoginPage.scss";
import LogoAnanas from "@/assets/ananas_logo.svg";
import backgroundAnanas from "@/assets/ananas_background.png";

const LoginPage = () => {
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
          <div className="login-page__input-group">
            <input placeholder="Mật khẩu" type="password" />
          </div>
          <div className="login-page__actions">
            <div className="login-page__remember">
              <input type="checkbox" /> Ghi nhớ tài khoản
            </div>
            <span className="login-page__forgot">
              <a href="#">Quên mật khẩu</a>
            </span>
          </div>
          <button className="login-page__btn-submit">Đăng nhập</button>
        </form>
      </div>

      <div className="login-page__banner">
        <img src={backgroundAnanas} alt="background"></img>
      </div>
    </div>
  );
};

export default LoginPage;
