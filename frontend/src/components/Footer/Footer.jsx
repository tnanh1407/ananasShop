import "./Footer.scss";
import { Button, Container, Row, Col, Accordion } from "react-bootstrap";
import FacebooImg from "../../assets/faceboook.png";
import InstagramImg from "../../assets/instagram.png";
import YoutubeImg from "../../assets/youtube.png";
import ananasLogo from "../../assets/Logo_Footer.svg";
import logoShop from "../../assets/shop.svg";

import arrowRight from "../../assets/arrow_right.jpg";
import iconTop from "../../assets/icon_top.png";
import boCongThuong from "../../assets/icon_bocongthuong.png";
import dmca from "../../assets/dmca_protected_sml_120n.png";
const AccordionComponent = () => {
  return (
    <Accordion defaultActiveKey="0" className="custom-accordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Sản phẩm</Accordion.Header>
        <Accordion.Body>
          <p>Giày nam</p>
          <p>Giày nữ</p>
          <p>Thời trang & phụ kiện</p>
          <p>Sale-off</p>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>Về công ty</Accordion.Header>
        <Accordion.Body>
          <p>Dứa tuyển dụng</p>
          <p>Liên hệ nhượng quyền</p>
          <p>Về Ananas</p>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Hỗ trợ</Accordion.Header>
        <Accordion.Body>
          <p>FAQS</p>
          <p>Bảo mật thông tin</p>
          <p>Chính sách chung</p>
          <p>Tra cứu đơn hàng</p>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>Liên hệ</Accordion.Header>
        <Accordion.Body>
          <p>Email góp ý</p>
          <p>Hotline</p>
          <p>1900 0014</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__width__min">
        <AccordionComponent></AccordionComponent>
        <h3 className="footer__title__min">ANANAS SOCIAL</h3>
        <div className="footer__social__min">
          <img src={FacebooImg}></img>
          <img src={InstagramImg}></img>
          <img src={YoutubeImg}></img>
        </div>
        <h3 className="footer__title__min">Đăng kí nhận email</h3>
        <div className="footer__search__min">
          <input type="text"></input>
          <img src={arrowRight}></img>
        </div>
        <div className="footer__backToHeader__min">
          <img src={iconTop}></img>
          <span>Quay về trang home</span>
        </div>
        <p className="footer__coppyRight__min">
          © 2025 Ananas. All Rights Reserved
        </p>
        <div className="footer__comfirm__min">
          <img src={boCongThuong}></img>
          <img src={dmca}></img>
        </div>
      </div>
      <div className="footer__width__max">
        <Row className="footer__main">
          <Col lg={3} className="footer__logo">
            <img src={logoShop}></img>
            <button className="footer__found__shop">Tìm cửa hàng</button>
          </Col>
          <Col lg={9} className="footer__menu">
            <Row className="footer__menu__list">
              <Col lg={3} className="footer__menu__list__items">
                <h3 className="footer__title">SẢN PHẨM</h3>
                <p>Giày Nam</p>
                <p>Giày Nữ</p>
                <p>Thời trang & phụ kiện</p>
                <p>Sale off</p>
              </Col>
              <Col lg={3} className="footer__menu__list__items">
                <h3 className="footer__title">Về công ty</h3>
                <p>Dứa tuyển dụng</p>
                <p>Liên hệ nhượng quyền</p>
                <p>Về Ananas</p>
              </Col>

              <Col lg={3} className="footer__menu__list__items">
                <h3 className="footer__title">Hỗ trợ</h3>
                <p>FAQS</p>
                <p>Bảo mật thông tin</p>
                <p>Chính sách chung</p>
                <p>Tra cứu đơn hàng</p>
              </Col>

              <Col lg={3} className="footer__menu__list__items">
                <h3 className="footer__title">Liên hệ</h3>
                <p>Email góp ý</p>
                <p>Hotline</p>
                <p>1900 0014</p>
                <p>Tra cứu đơn hàng</p>
              </Col>
            </Row>
            <Row className="footer__social__and__search">
              <Col lg={3} className="footer__social">
                <h3 className="footer__title">ANANAS SOCIAL</h3>
                <div className="footer__social__icon">
                  <img src={FacebooImg}></img>
                  <img src={InstagramImg}></img>
                  <img src={YoutubeImg}></img>
                </div>
              </Col>
              <Col lg={3} className="footer__register__email">
                <input type="text"></input>
                <img src={arrowRight}></img>
              </Col>
              <Col lg={6} className="footer__logo_ananas">
                <img src={ananasLogo}></img>
              </Col>
            </Row>
            <Row>
              <Col lg={3} className="footer__comfirm">
                <img src={boCongThuong}></img>
                <img src={dmca}></img>
              </Col>
              <Col lg={6} className="footer__copyRight">
                © 2025 Ananas. All Rights Reserved
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
