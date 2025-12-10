import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Import Layout
import MainLayout from "../layouts/MainLayout.jsx";
import ProfileLayout from "../layouts/ProfileLayout/ProfileLayout.jsx";

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
const DiscoverYouPage = React.lazy(() =>
  import("../pages/DiscoverYouPage/DiscoverYouPage.jsx")
);

const InfoUserPage = React.lazy(() =>
  import("../pages/ProfilePage/InfoUserPage/InfoUserPage.jsx")
);
const NotificationPage = React.lazy(() =>
  import("../pages/ProfilePage/NotificationPage/NotificationPage.jsx")
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

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
const AppRouter = () => {
  return (
    <BrowserRouter>
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
            <Route path="*" element={<NotFoundPage />}></Route>
            <Route path="/discoverYou" element={<DiscoverYouPage />}></Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfileLayout />}>
                <Route
                  index
                  element={<Navigate to="account" replace />}
                ></Route>
                <Route path="account" element={<InfoUserPage />}></Route>
                <Route path="notification" element={<NotificationPage />} />
              </Route>
            </Route>
          </Route>

          {/* ========================================================= */}
          {/* NHÓM 2: Full màn hình                       */}
          {/* ========================================================= */}
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/forgot" element={<ForgotPage />}></Route>

          <Route element={<ProtectedRoute />}></Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
