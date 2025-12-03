import "./Header.scss";
import {
  BookHeart,
  ChevronDown,
  Handbag,
  MapPin,
  Package,
  Search,
  User,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import LogoAnanas from "../../assets/ananas_logo.svg";
import DiscoverYOU from "../../assets/DiscoverYOU.svg";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import dropMenu1 from "../../assets/dropMenu1.jpg";
import dropMenu2 from "../../assets/dropMenu2.jpg";
import dropMenu3 from "../../assets/dropMenu3.jpg";
import dropMenu4 from "../../assets/dropMenu4.jpg";
import { useState } from "react";
const AnnouncementBar = () => {
  return (
    // Thêm class 'header__announcement-bar' để styling
    <div className="header__announcement-bar">
      <Swiper
        navigation={true}
        modules={[Navigation]} // Truyền module Navigation
        className="mySwiper header__carousel"
        loop={true} // Lặp vô hạn cho carousel thông báo
        slidesPerView={1}
        autoplay={{
          delay: 1000, // 10000 milliseconds = 10 giây
          disableOnInteraction: false, // Giữ cho slider tự trượt sau khi người dùng tương tác (nhấn nút)
        }}
      >
        {/* Dữ liệu lấy từ các hình ảnh bạn cung cấp */}
        <SwiperSlide>BUY 2 GET 10% OFF - ÁP DỤNG VỚI TẤT CẢ BASIC</SwiperSlide>
        <SwiperSlide>BUY MORE PAY LESS - ÁP DỤNG KHI MUA PHỤ KIỆN</SwiperSlide>
        <SwiperSlide>KHUYẾN MÃI HẤP DẪN KHÁC TẠI ANANAS</SwiperSlide>
        <SwiperSlide>FREE SHIP VỚI HÓA ĐƠN TỪ 900K !</SwiperSlide>
        <SwiperSlide>
          HÀNG 2 TUẦN NHẬN ĐỔI - ÁP DỤNG KHI MUA ĐIỆN THOẠI
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <header className="header">
      <div className="header__utinity">
        <div className="header__utinity__item">
          <Package />
          <span>Tra cứu đơn hàng</span>
        </div>
        <div className="header__utinity__item">
          <MapPin />
          <span>Tìm cửa hàng</span>
        </div>
        <div className="header__utinity__item">
          <BookHeart />
          <span>Yêu thích</span>
        </div>
        <div className="header__utinity__item">
          <User />
          <span>Đăng nhập</span>
        </div>
        <div className="header__utinity__item">
          <Handbag />
          <span>Giỏ hàng</span>
        </div>
      </div>
      <div className="header__menu">
        <div className="header__logo">
          <img src={LogoAnanas} alt="logo_ananas"></img>
        </div>
        <div className="header__category">
          <div className="header__category__items">
            <span>Sản phẩm</span>
            <ChevronDown />
          </div>

          <div className="header__line"></div>

          <div
            className="header__category__items"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span>Nam</span>
            <ChevronDown />
          </div>

          <div className="header__line"></div>
          <div className="header__category__items">
            <span>Nữ</span>
            <ChevronDown />
          </div>
          <div className="header__line"></div>
          <div className="header__category__items">
            <span>Sale off</span>
            <ChevronDown />
          </div>
          <div className="header__line"></div>
          <div className="header__category__items">
            <img src={DiscoverYOU} alt="DiscoverYOU" />
          </div>
        </div>

        <div className="header__search">
          <Search className="header__icon__search" />
          <input type="text" placeholder="Nhập sản phẩm bạn muốn tìm kiếm" />
        </div>
      </div>
      <AnnouncementBar />
      {isHovered && (
        <div className="header__showCategory">
          <div className="header__list">
            <div className="header__list__items">
              <img src={dropMenu1} alt="drop__menu_1" />
              <p>Cho Nam</p>
            </div>

            <div className="header__list__items">
              <img src={dropMenu2} alt="drop__menu_2" />
              <p>Cho Nữ</p>
            </div>

            <div className="header__list__items">
              <img src={dropMenu3} alt="drop__menu_3" />
              <p>outlet sale</p>
            </div>

            <div className="header__list__items">
              <img src={dropMenu4} alt="drop__menu_4" />
              <p>Thời trang và phụ kiện</p>
            </div>
          </div>
          <p className="header__title__hover">
            MỌI NGƯỜI THƯỜNG GỌI CHÚNG TÔI LÀ{" "}
            <span style={{ color: "white" }}>DỨA</span> !
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
