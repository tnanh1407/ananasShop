import "./ProfileLayout.scss";
import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";

const ProfileLayout = () => {
  return (
    <div className="profile-layout">
      <Container>
        <Row>
          <Col lg={3} md={4}>
            <ProfileSidebar />
          </Col>
          <Col lg={9} md={8}>
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
