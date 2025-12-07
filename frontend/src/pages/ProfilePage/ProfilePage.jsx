import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logout } from "../../features/auth/authSlice";
import { logoutUser } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";
import { Button, Container, Card } from "react-bootstrap";

const ProfilePage = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call API logout (clear cookie)
      dispatch(logout()); // Clear Redux state
      navigate("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  if (!user) {
    return <div>Bạn chưa đăng nhập!</div>;
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Thông tin tài khoản</Card.Title>
          <Card.Text>
            <strong>Họ tên:</strong> {user.fullname} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Username:</strong> {user.username} <br />
            <strong>Vai trò:</strong> {user.role}
          </Card.Text>
          <Button variant="danger" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
