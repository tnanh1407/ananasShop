import "./HomePage.scss";
import { Col, Container, Row } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <Container className="">
        <Row className="justify-content-md-center">
          <Col md="2">1 of 3</Col>
          <Col md="8">Variable width content</Col>
          <Col md="7">3 of 3</Col>
        </Row>

        <Row>
          <Col>1 of 3</Col>

          <Col md="auto">Variable width content</Col>

          <Col lg={2}>3 of 3</Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
