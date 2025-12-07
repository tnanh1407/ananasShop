import "./HomePage.scss";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import banner from "../../assets/banner.jpg";
import collectionOne from "../../assets/collection1.jpg";
import collectionTwo from "../../assets/collection2.jpg";
import buy1 from "../../assets/buy1.jpg";
import buy2 from "../../assets/buy2.jpg";
import buy3 from "../../assets/buy3.jpg";
import banner2 from "../../assets/banner_2.jpg";
const HomePage = () => {
  return (
    <>
      <section className="banner">
        <Container fluid className="p-0">
          <img src={banner}></img>
        </Container>
      </section>

      <section className="collection">
        <Container fluid="md">
          <Row className="collection__wrap p-0">
            <Col className="collection__left" xs={12} lg={6}>
              <div className="collection__img">
                <img src={collectionOne}></img>
              </div>
              <h3 className="collection__title">Black & black</h3>
              <p className="collection__desc">
                Mặc dù được ứng dụng rất nhiều , nhưng sắc đen lúc nào cũng toát
                lên một vẻ huyền bí không bị nhàm chán
              </p>
            </Col>

            <Col className="collection__right" xs={12} lg={6}>
              <div className="collection__img">
                <img src={collectionTwo}></img>
              </div>
              <h3 className="collection__title">outlet sale</h3>
              <p className="collection__desc">
                Danh mục những sản phẩm bán tại "giá tốt hơn" chỉ được bán kênh
                online - online Only . Chúng tôi đã từng làm mưa làm gió một
                thời gian và hiện đang rơi vào tình trạng bể size , bể số
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="buy">
        <Container fluid="md">
          <h2 className="buy__title">Danh mục mua hàng</h2>
          <Row className="buy__wrap">
            <Col className="buy__items" xs={12} lg={4}>
              <img src={buy1}></img>
              <div className="buy__content">
                <h3 className="buy__items__title">Giày Nam</h3>
                <p>New Arrival</p>
                <p>Best Seller</p>
                <p>Sale-off</p>
              </div>
            </Col>
            <Col className="buy__items" xs={12} lg={4}>
              <img src={buy2}></img>
              <div className="buy__content">
                <h3 className="buy__items__title">Giày Nữ</h3>
                <p>New Arrival</p>
                <p>Best Seller</p>
                <p>Sale-off</p>
              </div>
            </Col>
            <Col className="buy__items" xs={12} lg={4}>
              <img src={buy3}></img>
              <div className="buy__content">
                <h3 className="buy__items__title">Dòng sản phẩm</h3>
                <p>Basas</p>
                <p>Vintas</p>
                <p>Urbas</p>
                <p>Pattas</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bannerTwo">
        <Container fluid className="p-0">
          <img src={banner2}></img>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
