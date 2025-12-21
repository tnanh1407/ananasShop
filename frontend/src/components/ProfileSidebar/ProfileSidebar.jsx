import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../../features/auth/authSlice";
import { User, FileText, MapPin, Bell, Eye, LogOut } from "lucide-react"; // Import icon từ lucide
import "./ProfileSidebar.scss";
import { logoutUser } from "../../api/userAPI";

const ProfileSidebar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };
  return (
    <aside className="profile-sidebar">
      {/* Phần thông tin user tóm tắt */}
      <div className="profile-sidebar__user">
        <div className="profile-sidebar__avatar">
          {/* Nếu có ảnh thì hiện ảnh, không thì hiện icon */}
          <User size={30} />
        </div>
        <div className="profile-sidebar__info">
          <span className="account-label">Tài khoản của</span>
          <strong>{user?.fullname || "User"}</strong>
        </div>
      </div>

      {/* Danh sách Menu */}
      <nav className="profile-sidebar__menu">
        <NavLink
          to="/profile/account"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <div className="icon">
            <User size={20} />
          </div>
          <span>Thông tin tài khoản</span>
        </NavLink>

        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <div className="icon">
            <FileText size={20} />
          </div>
          <span>Quản lý đơn hàng</span>
        </NavLink>

        <NavLink
          to="/profile/address"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <div className="icon">
            <MapPin size={20} />
          </div>
          <span>Sổ địa chỉ</span>
        </NavLink>

        <NavLink
          to="/profile/notification"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <div className="icon">
            <Bell size={20} />
          </div>
          <span>Thông báo của tôi</span>
        </NavLink>

        <NavLink
          to="/profile/viewed"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <div className="icon">
            <Eye size={20} />
          </div>
          <span>Sản phẩm đã xem</span>
        </NavLink>
        <div
          className="menu-item logout-item"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          <div className="icon">
            <LogOut size={20} />
          </div>
          <span>Đăng xuất</span>
        </div>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
