import { Container, Row, Col } from "react-bootstrap";
import "./DiscoverYouPage.scss";

import banner from "../../assets/shoes_banner.jpg";
import { Share, ThumbsUp } from "lucide-react";
import Shoes1 from "../../assets/img_shoes_1.jpg";
import Shoes2 from "../../assets/img_shoes_2.jpg";
import Shoes3 from "../../assets/img_shoes_3.jpg";
import Shoes4 from "../../assets/img_shoes_4.jpg";
import Shoes5 from "../../assets/img_shoes_5.jpg";
import Related from "../../assets/related1.jpg";
import Related2 from "../../assets/related2.jpg";
import Related3 from "../../assets/related3.jpg";
import News1 from "../../assets/news1.jpg";
import News2 from "../../assets/news2.jpg";
import News3 from "../../assets/news3.jpg";
const DiscoverYouPage = () => {
  return (
    <>
      <section className="banner">
        <Container fluid className="p-0">
          <img src={banner}></img>
        </Container>
      </section>

      <section className="main">
        <Container fluid="sm" className="p-0">
          <h3 className="main__title">"GIẢI PHẪU" GIÀY {<br />}VULCANIZED</h3>
          <div className="divider"></div>
          <div className="main__header">
            <div className="main__header__left">
              <span>05.07.2019 | </span>
              <span>admin</span>
            </div>
            <div className="main__header__right">
              <button className="main__header__right__button">
                <ThumbsUp /> Thích
              </button>
              <Share className="main__header__right__share" />
            </div>
          </div>
          <div className="main__content">
            <span className="main__content">
              Trước khi thực hiện cuộc "giải phẫu" như tiêu đề của bài viết,
              chúng tôi nghĩ bạn cần biết rằng những đôi giày Sneaker bạn trên
              chân mỗi ngày hiện tại đang được chia làm 2 nhóm chính nếu phân
              loại chúng dựa trên phương pháp sản xuất: - Nhóm thứ nhất là{" "}
              <b>Cold Cement Sneaker</b> bao gồm những mẫu Sneaker được làm từ
              phương pháp dán đế lạnh - đại diện cho nhóm này là những đôi giày
              "ai cũng biết" như Nike Air Force 1, Adidas Originals Stan Smith,
              Puma Suede, Asics Onitsuka Tiger Corsair,..hay những đôi giày
              Sportswear phục vụ cho các hoạt động thể thao. - Nhóm thứ hai là
              <b> Vulcanized Sneaker</b> hay còn gọi giày cao su lưu hóa. Đây là
              những đôi giày mang form dáng classic, tối giản đã trở nên "bất
              hủ" với phương pháp sản xuất đã có từ rất lâu như Converse Chuck
              Taylor All Star, Vans Old Skool...và những đôi giày thuộc các dòng
              Basas, Vintas, Urbas từ Ananas hiện tại các bạn đang chọn lựa. Mỗi
              nhóm giày lại mang một ưu, nhược điểm khác nhau tuỳ theo sự lựa
              chọn của mỗi người. Trong phạm vi ngắn của bài viết này, Ananas
              xin phép chỉ đào sâu thông tin xoay quanh cấu tạo của{" "}
              <b>Vulcanized Sneaker</b> (giày Vulcanized) - loại giày mà chúng
              tôi đã chọn làm "cốt lõi" để theo đuổi trong suốt hành trình của
              mình và "mách" cho bạn cách dễ nhất để phân biệt chúng với nhóm
              còn lại.
            </span>
            <img className="main__content__img__one" src={banner}></img>
            <p className="main__content__note ">
              Có nhiều thông tin về cách gọi tên về các bộ phận trên giày, vì
              thế để tránh thông tin bị nhập nhằng, chúng tôi đã thống nhất sử
              dụng các từ ngữ được dùng trong quá trình sản xuất để gọi tên
              những bộ phận trên đôi giày của mình.
            </p>
            <div className="main__content__title">
              ANANAS CHỌN VULCANIZED SNEAKER LÀ SẢN PHẨM "CỐT LÕI" TRONG SUỐT
              HÀNH TRÌNH
            </div>
            <div className="main__content__2">
              <div className="main__content">
                Giống với mọi đôi Sneaker khác, giày Vulcanized về tổng thể cũng
                có 2 phần chính gồm Upper: toàn bộ các thành phần nằm ở phần
                thân trên và Sole: phần đế luôn được dùng cao su làm "nền móng"
                bên dưới. Theo chú thích từ (1) - (11) bạn có thể thấy trên
                hình, Upper bao gồm các bộ phận:{" "}
              </div>
              <Row className="main__content__detail">
                <Col xs={12} lg={6} className="main__content__detail__text">
                  <b>(1) Vamp:</b> mũi giày - phần nằm phía trước của giày, tiếp
                  xúc với ngón chân. <b>(2) Tongue:</b> hay thường được gọi với
                  cái tên thuần Việt là lưỡi gà. Đây là phần đệm bên trên của
                  bàn chân và được kết nối với đỉnh của Vamp. <b>(3) Stamp:</b>{" "}
                  miếng tem logo trái dứa được may đính hoặc ép nhiệt trực tiếp
                  trên lưỡi gà. <b>(4) Eyestays: </b>là bộ phận chứa 2 hàng lỗ
                  xỏ dây giày. Trong sản xuất, bộ phận này được gọi là nẹp ô-zê.
                  Giày có thể có nẹp ô-zê hoặc không tùy vào ý đồ từ thiết kế.
                  <b>(5) Eyelets:</b> nằm trên Eyestays, Eyelets là từ dùng để
                  chỉ lỗ xỏ dây giày, nếu có khoen đi kèm, Eyelets còn được gọi
                  là nút ô-zê. <b>(6) Stitching:</b> những đường chỉ may vừa có
                  tác dụng gắn các phần lại với nhau, vừa có tác dụng trang trí.{" "}
                  <b>(7) Laces:</b>
                  dây giày - thành phần rất quen thuộc và có thể thay đổi dễ
                  dàng.
                </Col>
                <Col xs={12} lg={6} className="main__content__detail__img">
                  <img src={Shoes1}></img>
                </Col>
              </Row>
            </div>

            <div className="main__content__2">
              <Row className="main__content__detail">
                <Col xs={12} lg={6} className="main__content__detail__img">
                  <img src={Shoes2}></img>
                </Col>
                <Col xs={12} lg={6} className="main__content__detail__text">
                  <b>(8) Aglets:</b> nằm ở phần đầu của dây giày, còn gọi là đầu
                  tips giữ dây. <b>(9) Heel counter:</b> counter hậu - bộ phận
                  định hình gót cho chiếc giày (bên trong) và trang trí phần gót
                  (bên ngoài). <b>(10) Heel strap:</b> hay còn gọi là nẹp hậu.
                  Công dụng chính là tăng tính thẩm mỹ cho sản phẩm. Bộ phận này
                  có thể không có ở một số kiểu giày và dáng giày.{" "}
                  <b>(11) Lining:</b>
                  còn gọi là lót thân - lớp lót bên trong thân giày. Ở mục số
                  <b>(12)</b>, chúng ta có Insock: lớp đầu tiên chân bạn tiếp
                  xúc khi xỏ chân vào giày. Insock ở một số mẫu giày sẽ có công
                  dụng giữ ấm, khử mùi trong khi một số mẫu khác lại là bộ phận
                  tạo độ êm ái khi mang và
                </Col>
              </Row>
            </div>

            <div className="main__content__title">
              SNEAKER VỀ TỔNG THỂ LUÔN CÓ 2 PHẦN CHÍNH LÀ UPPER VÀ SOLE, CÒN
              VIỆC PHÂN LOẠI CHÚNG THÀNH VULCANIZED HAY COLD CEMENT LÀ DỰA TRÊN
              PHƯƠNG PHÁP SẢN XUẤT
            </div>

            <span className="main__content">
              Sole là bộ phận quan trọng và "khó nhai" nhất trong quá trình sản
              xuất giày. Phiên bản đầy đủ của chúng gồm 3 phần là Insole (đế
              trong), Midsole (đế giữa) và Outsole (đế ngoài) và thường có ở
              giày <b>Cold Cement</b>. Nhiều người vẫn lầm tưởng rằng Midsole
              của giày Vulcanized chính là lớp foxing cao su (15) nằm giữa Upper
              và Outsole. Tuy nhiên trên thực tế giày Vulcanized không có
              Midsole mà chỉ gồm 2 phần: <b>(13) Insole:</b> đế trong - phần nằm
              dưới Insock, không thể nhìn thấy từ bên ngoài vì bị che đi.{" "}
              <b>(14) Outsole:</b> đế ngoài - bộ phận duy nhất của giày tiếp xúc
              trực tiếp với mặt đất. Vì là bộ phận chịu nhiều lực ma sát trong
              lúc giày được sử dụng nên chất liệu đế cũng phải là những chất
              liệu có tính bền chắc cao.
            </span>
            <img className="main__content__img__one" src={Shoes3}></img>
            <p className="main__content__note ">
              Đế của giày Vulcanized phải được làm từ cao su
            </p>
            <span className="main__content">
              Nhóm bộ phận cuối cùng "làm bằng cao su" cũng không kém phần quan
              trọng trong việc thành hình một đôi giày Vulcanized hoàn chỉnh. Đó
              là: <b>(15) Foxing:</b> lớp cao su được dán lên giày để gia cố,
              kết nối Upper và Sole, đây cũng là chi tiết giúp bạn dễ dàng nhất
              để "phát hiện" ra giày Vulcanized và phân biệt chúng với giày Cold
              Cement đã đề cập ở đầu bài viết (giày Cold Cement không có bộ phận
              này). <b>(16) Bumper:</b> còn có cách gọi khác trong sản xuất là
              foxing mũi. Bumper thường dùng để gia cố cho foxing thêm chắc
              chắn. Tùy vào mục đích trang trí mà chất liệu / màu sắc của bumper
              có thể khác với tổng thể foxing. Bạn có thể thấy rõ điều này qua
              các sản phẩm trong bộ Basas Bumper Gum vừa được Ananas ra mắt cách
              đây không lâu. <b>(17) Heel label:</b> chiếc tem gót - điểm nhấn
              không kém phần quan trọng vì mang trọng trách truyền tải thông
              điệp của thương hiệu.
            </span>
            <div className="main__content__2">
              <Row className="main__content__detail">
                <Col xs={12} lg={6} className="main__content__detail__img">
                  <img src={Shoes4}></img>
                </Col>
                <Col xs={12} lg={6} className="main__content__detail__img">
                  <img src={Shoes5}></img>
                </Col>
              </Row>
            </div>
            <p className="main__content__note ">
              Bumper và Heel label giúp giày có thêm những điểm nhấn riêng và
              truyền tải thông điệp về văn hoá Vulcanized
            </p>

            <div className="main__content__title">
              FOXING LÀ BỘ PHẬN NHẬN DIỆN ĐẶC TRƯNG NHẤT CỦA GIÀY VULCANIZED
            </div>

            <span className="main__content ">
              Vậy là chúng ta đã hiểu sơ lược về những bộ phận cấu tạo nên một
              đôi giày Vulcanized nói chung và hiểu hơn về giày Ananas nói riêng
              rồi. Hy vọng đây sẽ là những thông tin hữu ích giúp cho bạn có
              thêm kiến thức trong hành trình tìm hiểu nền văn hóa sát mặt đất
              rộng lớn. Chúng tôi sẽ sớm trở lại trong các bài viết sắp tới để
              cung cấp thêm cho các bạn nhiều thông tin thú vị hơn nữa vời những
              chủ đề có liên quan đến chính Ananas nhé. P/s: Nếu bạn có thắc
              mắc, hay có phản hồi nào muốn chia sẻ, chúng tôi rất vui được trò
              chuyện cùng bạn tại hộp thư info@ananas.vn.
            </span>

            <div className="main__header high">
              <div className="main__header__left">
                <span>05.07.2019 | </span>
                <span>admin</span>
              </div>
              <div className="main__header__right">
                <button className="main__header__right__button">
                  <ThumbsUp /> Thích
                </button>
                <Share className="main__header__right__share" />
              </div>
            </div>
            <div className="divider"></div>
          </div>
        </Container>
      </section>

      <section className="product-related">
        <Container>
          <h3 className="product-related__title">SẢN PHẨM LIÊN QUAN</h3>
          <Row className="product-related__list">
            <Col xs={4} className="product-related__items">
              <div className="product-related__items__img">
                <img src={Related}></img>
              </div>
              <div className="product-related__items__details">
                <p className="product-related__items__names">
                  Vintas Yesterday - Low top
                </p>
                <p className="product-related__items__styles">
                  Moonstruck Priate
                </p>
                <div className="product-related__items__price">
                  <span className="product-related__items__price--news">
                    350.000 VND
                  </span>
                  <span className="product-related__items__price--old">
                    480.000 VND
                  </span>
                </div>
              </div>
            </Col>
            <Col xs={4} className="product-related__items">
              <div className="product-related__items__img">
                <img src={Related2}></img>
              </div>
              <div className="product-related__items__details">
                <p className="product-related__items__names">
                  Vintas Yesterday - Low top
                </p>
                <p className="product-related__items__styles">
                  Moonstruck Priate
                </p>
                <div className="product-related__items__price">
                  <span className="product-related__items__price--news">
                    350.000 VND
                  </span>
                  <span className="product-related__items__price--old">
                    480.000 VND
                  </span>
                </div>
              </div>
            </Col>
            <Col xs={4} className="product-related__items">
              <div className="product-related__items__img">
                <img src={Related3}></img>
              </div>
              <div className="product-related__items__details">
                <p className="product-related__items__names">
                  Vintas Yesterday - Low top
                </p>
                <p className="product-related__items__styles">
                  Moonstruck Priate
                </p>
                <div className="product-related__items__price">
                  <span className="product-related__items__price--news">
                    350.000 VND
                  </span>
                  <span className="product-related__items__price--old">
                    480.000 VND
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="news-related">
        <Container>
          <h3 className="news-related__title">BÀI VIẾT KHÁC</h3>
          <Row className="news-related__list">
            <Col xs={4} className="news-related__items">
              <div className="news-related__items__img">
                <img src={News1}></img>
              </div>
              <div className="news-related__items__details">
                <p className="news-related__items__names">
                  URBAS CORLURAY PACK
                </p>
                <p className="news-related__items__desc">
                  Urbas Corluray Pack đem đến lựa chọn “làm mới mình” với sự kết
                  hợp 5 gam màu mang sắc thu; phù hợp với những người trẻ năng
                  động, mong muốn thể hiện cá tính riêng biệt khó trùng lặp.
                </p>
                <div className="news-related__items__more">Đọc thêm</div>
              </div>
            </Col>
            <Col xs={4} className="news-related__items">
              <div className="news-related__items__img">
                <img src={News2}></img>
              </div>
              <div className="news-related__items__details">
                <p className="news-related__items__names">
                  URBAS CORLURAY PACK
                </p>
                <p className="news-related__items__desc">
                  Urbas Corluray Pack đem đến lựa chọn “làm mới mình” với sự kết
                  hợp 5 gam màu mang sắc thu; phù hợp với những người trẻ năng
                  động, mong muốn thể hiện cá tính riêng biệt khó trùng lặp.
                </p>
                <div className="news-related__items__more">Đọc thêm</div>
              </div>
            </Col>
            <Col xs={4} className="news-related__items">
              <div className="news-related__items__img">
                <img src={News3}></img>
              </div>
              <div className="news-related__items__details">
                <p className="news-related__items__names">
                  URBAS CORLURAY PACK
                </p>
                <p className="news-related__items__desc">
                  Urbas Corluray Pack đem đến lựa chọn “làm mới mình” với sự kết
                  hợp 5 gam màu mang sắc thu; phù hợp với những người trẻ năng
                  động, mong muốn thể hiện cá tính riêng biệt khó trùng lặp.
                </p>
                <div className="news-related__items__more">Đọc thêm</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default DiscoverYouPage;
