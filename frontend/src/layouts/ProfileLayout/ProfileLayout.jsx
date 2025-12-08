import "./ProfileLayout.scss";
import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const ProfileLayout = () => {
  return (
    <div className="profile-layout">
      <Container>
        <Row>
          <Col lg={3} md={4}></Col>
          <Col lg={9} md={4}>
            <div className="profile-content">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileLayout;
