import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import Layout
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
const HomePage = React.lazy(() => import("./pages/Home/HomePage"));
// Import Component
const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* 1.Hiển thị giao diện dự phòng khi Component render */}
      <React.Suspense
        fallback={<div className="loading-spinner">Đang tải trang ...</div>}
      >
        {/* 2. Routes sử dụng layout MainLayout */}
        <Routes element={<MainLayout />}>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
        {/* 3.Route độc lập hiển thị giao diện 404  */}
        <Route path="*" element={NotFoundPage}></Route>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
