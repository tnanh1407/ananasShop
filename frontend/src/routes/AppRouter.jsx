import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Import Layout
import MainLayout from "../layouts/MainLayout.jsx";

// Import selector Redux
import {
  selectIsAuthenticated,
  selectIsLoading,
} from "../features/auth/authSlice.jsx";

// Import Component
const HomePage = React.lazy(() => import("../pages/Home/HomePage"));
const LoginPage = React.lazy(() => import("../pages/LoginPage/LoginPage"));
const NotFoundPage = React.lazy(() =>
  import("../pages/NotFoundPage/NotFoundPage")
);
const RegisterPage = React.lazy(() =>
  import("../pages/RegisterPage/RegisterPage")
);

const ForgotPage = React.lazy(() =>
  import("../pages/ForgotPage/ForgotPage.jsx")
);

// Component bảo vệ các router (Protected Route)

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center ", marginTop: "5px" }}>
        Đang kiểm tra đăng nhập...
      </div>
    );
  }

  return isAuthenticated;
};
const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* 1 */}
      <React.Suspense
        fallback={
          <div className="loading-spinner">Đang tải trang xuống ...</div>
        }
      >
        <Routes>
          {/* ========================================================= */}
          {/* NHÓM 1: MAIN LAYOUT (Có Header/Footer)                    */}
          {/* ========================================================= */}

          <Route element={<MainLayout />}>
            {/* Ai xem cũng được */}
            <Route path="/" element={<HomePage />}></Route>

            {/* Phải đăng nhập mới xem được */}
            <Route element={<ProtectedRoute />}></Route>
          </Route>

          {/* ========================================================= */}
          {/* NHÓM 2: Full màn hình                       */}
          {/* ========================================================= */}
          <Route path="/notFoundPage" element={<NotFoundPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/forgot" element={<ForgotPage />}></Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
