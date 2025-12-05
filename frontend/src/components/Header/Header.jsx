import "./Header.scss";
import {
  BookHeart,
  ChevronDown,
  Handbag,
  MapPin,
  Package,
  Search,
  User,
  ChevronUp,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import LogoAnanas from "../../assets/ananas_logo.svg";
import DiscoverYOU from "../../assets/DiscoverYOU.svg";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import dropMenu1 from "../../assets/dropMenu1.jpg";
import dropMenu2 from "../../assets/dropMenu2.jpg";
import dropMenu3 from "../../assets/dropMenu3.jpg";
import dropMenu4 from "../../assets/dropMenu4.jpg";
import { useState, useRef } from "react";
const AnnouncementBar = () => {
  return (
    <div className="header__announcement-bar">
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]} // Truyền module Navigation
        className="mySwiper header__carousel"
        loop={true} // Lặp vô hạn cho carousel thông báo
        slidesPerView={1}
        autoplay={{
          delay: 3000, // 10000 milliseconds = 10 giây
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
  const [isHoveredProduct, setIsHoveredProduct] = useState(false);
  const [isHoveredMale, setIsHoveredMale] = useState(false);
  const [isHoveredFemale, setIsHoveredFemale] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (callback) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    callback(true);
  };

  const handleMouseLeave = (callback) => {
    timeoutRef.current = setTimeout(() => {
      callback(false);
    }, 200); // 200ms là độ trễ
  };
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
          <div
            className="header__category__items"
            onMouseEnter={() => handleMouseEnter(setIsHoveredProduct)}
            onMouseLeave={() => handleMouseLeave(setIsHoveredProduct)}
          >
            <span>Sản phẩm</span>
            {isHoveredProduct ? <ChevronUp /> : <ChevronDown />}
          </div>

          <div className="header__line"></div>

          <div
            className="header__category__items"
            onMouseEnter={() => handleMouseEnter(setIsHoveredMale)}
            onMouseLeave={() => handleMouseLeave(setIsHoveredMale)}
          >
            <span>Nam</span>
            {isHoveredMale ? <ChevronUp /> : <ChevronDown />}
          </div>

          <div className="header__line"></div>
          <div
            className="header__category__items"
            onMouseEnter={() => handleMouseEnter(setIsHoveredFemale)}
            onMouseLeave={() => handleMouseLeave(setIsHoveredFemale)}
          >
            <span>Nữ</span>
            {isHoveredFemale ? <ChevronUp /> : <ChevronDown />}
          </div>
          <div className="header__line"></div>
          <div className="header__category__items">
            <span>Sale off</span>
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
      {isHoveredProduct && (
        <div
          className="header__showCategory"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
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
      {(isHoveredFemale || isHoveredMale) && (
        <div className="header__showMaleAndFemale">
          <div className="header__content">
            <div className="header__outstanding header__content__items">
              <h2>Nổi bật</h2>
              <p>Best saller</p>
              <p>New Arrival</p>
              <p>Sale off</p>

              <h3>Bộ sưu tập</h3>
              <p>Recycled Material</p>
              <p>Day slide</p>
              <p>Denim</p>
              <p>Track 6 OG</p>
              <p>Pattas Polka Dots</p>

              <h3>Collaboration</h3>
            </div>
            <div className="header__shoes header__content__items">
              <h2>Giày</h2>
              <h3>Dòng sản phẩm</h3>
              <p>Batas</p>
              <p>Vintas</p>
              <p>Urbas</p>
              <p>Creas</p>
              <p>Track 6</p>
              <h3>Style</h3>
              <p>High Top</p>
              <p>Low Top</p>
              <p>Slip-on</p>
              <h3>Tất cả giày</h3>
            </div>
            <div className="header__fashionAndAccessory header__content__items">
              <h2>Thời trang & phụ kiện</h2>
              <h3>Nửa trên</h3>
              <p>Basic Tee</p>
              <p>Graphic Tee</p>
              <p>Sweatshirt</p>
              <p>Hoodie</p>

              <h3>Phụ kiện</h3>
              <p>Nón</p>
              <p>Dây giày</p>
              <p>Vớ</p>
              <p>Túi Tote</p>
              <h3>Xem tất cả</h3>
            </div>
          </div>
          <p className="header__title__hover">
            Mọi người thường gọi chúng tôi là{" "}
            <span style={{ color: "white" }}>DỨA</span> !{" "}
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
