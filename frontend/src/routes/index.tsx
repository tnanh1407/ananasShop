import {} from '@/features/auth/LoginPage';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout.tsx';
import LoginPage from '@/features/auth/LoginPage/LoginPage';
export default function AppRoutes() {
  return (
    // <Routes>
    //   {/* <Route path="/" element={<Home />} /> */}
    //   <Route path="/" element={<LoginPage />} />
    // </Routes>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
