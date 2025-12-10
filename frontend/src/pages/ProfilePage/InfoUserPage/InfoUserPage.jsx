import React, { useState, useEffect } from "react";
import "./InfoUserPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  setCredentials,
} from "../../../features/auth/authSlice.jsx";
import {
  User,
  Phone,
  Mail,
  Lock,
  Trash2,
  Facebook,
  Shield,
  Camera,
} from "lucide-react";
import { Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { updateUser } from "../../../api/userAPI.js";

const InfoUserPage = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  // State quản lý form input
  const [formData, setFormData] = useState({
    fullname: "",
    nickname: "",
    day: "1",
    month: "1",
    year: "2000",
    gender: "male",
    nationality: "Vietnam",
  });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({
        ...prev,
        fullname: user.fullname || "",
        nickname: user.username || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Tạo mảng ngày/tháng/năm cho dropdown
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleUpdatePhone = () => {
    Swal.fire({
      title: "Cập nhật số điện thoại",
      input: user.phoneNumber || "",
      inputAttributes: {
        autocapitalize: "off",
        placeholder: "Nhập số điện thoại mới ...",
      },
      showCancelButton: true,
      confirmButtonText: "Lưu thay đổi",
      cancelButtonText: "Hủy bỏ",
      confirmButtonColor: "#0d6efd",
      showLoaderOnConfirm: true,

      preConfirm: async (newPhone) => {
        try {
          // 1. Validate sơ bộ (Frontend)
          if (!newPhone || newPhone.trim() === "") {
            Swal.showValidationMessage("Vui lòng nhập số điện thoại");
            return false;
          }

          // Regex kiểm tra số điện thoại Việt Nam (cơ bản)
          const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
          if (!phoneRegex.test(newPhone)) {
            Swal.showValidationMessage("Số điện thoại không hợp lệ");
            return false;
          }

          const response = await updateUser(user._id, {
            phoneNumber: newPhone,
          });
          return response.user;
        } catch (error) {
          const errorMsg = error.message || "Đã xảy ra lỗi, vui lòng thử lại!";
          Swal.showValidationMessage(`Yêu cầu thất bại: ${errorMsg}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const updateUser = result.value;
        dispatch(setCredentials({ user: updateUser }));

        Swal.fire({
          title: "Thành công ! ",
          text: `Số điện thoại đã cập nhật thành công : ${updateUser.phoneNumber}`,
          icon: "success",
        });
      }
    });
  };

  if (!user) return null;

  return (
    <div className="info-user-page">
      <h4 className="mb-4">Hồ sơ của tôi</h4>
      <Row>
        {/* --- CỘT TRÁI: FORM THÔNG TIN --- */}
        <Col lg={7} className="left-column">
          <div className="avatar-section">
            <div className="avatar-circle">
              <User size={60} strokeWidth={1.5} />
            </div>
            <div className="edit-avatar-btn">
              <Camera size={16} />
            </div>
          </div>

          <form>
            <div className="form-group">
              <label>Họ & Tên</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Nickname</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  placeholder="Thêm nickname"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Ngày sinh</label>
              <div className="input-wrapper">
                <select name="day" value={formData.day} onChange={handleChange}>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      Tháng {m}
                    </option>
                  ))}
                </select>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Giới tính</label>
              <div className="input-wrapper">
                <div className="gender-options">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                    />{" "}
                    Nam
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                    />{" "}
                    Nữ
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={formData.gender === "other"}
                      onChange={handleChange}
                    />{" "}
                    Khác
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Quốc tịch</label>
              <div className="input-wrapper">
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                >
                  <option value="Vietnam">Việt Nam</option>
                  <option value="USA">Hoa Kỳ</option>
                  <option value="UK">Vương quốc Anh</option>
                  <option value="France">Pháp</option>
                  <option value="Germany">Đức</option>
                  <option value="Japan">Nhật Bản</option>
                  <option value="Korea">Hàn Quốc</option>
                  <option value="China">Trung Quốc</option>
                  <option value="Thailand">Thái Lan</option>
                  <option value="Australia">Úc</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
            </div>

            <button type="button" className="btn-save">
              Lưu thay đổi
            </button>
          </form>
        </Col>

        {/* --- CỘT PHẢI: LIÊN HỆ & BẢO MẬT --- */}
        <Col lg={5} className="right-column">
          {/* Số điện thoại & Email */}
          <div className="section-block">
            <h5>Số điện thoại và Email</h5>
            <div className="info-item">
              <div className="info-detail">
                <Phone className="icon" size={20} />
                <div className="text-content">
                  <span className="label">Số điện thoại</span>
                  <span className="value">
                    {user.phoneNumber || "Chưa cập nhật"}
                  </span>
                </div>
              </div>
              <button className="btn-action" onClick={handleUpdatePhone}>
                Cập nhật
              </button>
            </div>

            <div className="info-item">
              <div className="info-detail">
                <Mail className="icon" size={20} />
                <div className="text-content">
                  <span className="label">Địa chỉ email</span>
                  <span className="value">{user.email}</span>
                </div>
              </div>
              <button className="btn-action">Cập nhật</button>
            </div>
          </div>

          {/* Bảo mật */}
          <div className="section-block">
            <h5>Bảo mật</h5>
            <div className="info-item">
              <div className="info-detail">
                <Lock className="icon" size={20} />
                <div className="text-content">
                  <span className="label">Thiết lập mật khẩu</span>
                </div>
              </div>
              <button className="btn-action">Cập nhật</button>
            </div>

            <div className="info-item">
              <div className="info-detail">
                <Shield className="icon" size={20} />
                <div className="text-content">
                  <span className="label">Thiết lập mã PIN</span>
                </div>
              </div>
              <button className="btn-action">Thiết lập</button>
            </div>

            <div className="info-item">
              <div className="info-detail">
                <Trash2 className="icon" size={20} />
                <div className="text-content">
                  <span className="label">Yêu cầu xóa tài khoản</span>
                </div>
              </div>
              <button className="btn-action btn-delete">Yêu cầu</button>
            </div>
          </div>

          {/* Liên kết mạng xã hội */}
          <div className="section-block">
            <h5>Liên kết mạng xã hội</h5>
            <div className="info-item">
              <div className="info-detail">
                <Facebook className="icon" size={20} color="#1877F2" />
                <div className="text-content">
                  <span className="value">Facebook</span>
                </div>
              </div>
              <button className="btn-action">Liên kết</button>
            </div>

            <div className="info-item">
              <div className="info-detail">
                {/* Giả lập icon Google */}
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background:
                      "conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) ",
                  }}
                ></div>
                <div className="text-content">
                  <span className="value">Google</span>
                </div>
              </div>
              <button className="status-linked" disabled>
                Đã liên kết
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InfoUserPage;
