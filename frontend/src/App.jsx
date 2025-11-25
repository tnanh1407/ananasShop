import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { setCredentials, setLoadingFlase } from "./features/auth/authSlice.jsx";
import { getUserProfile } from "./api/userAPI.js";
import { storeRedux } from "./app/store";
import AppRouter from "./routes/AppRouter.jsx";
import { Toaster } from "sonner";

const AppContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getUserProfile();
        if (user) {
          dispatch(setCredentials({ user }));
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        console.log("Chưa đăng nhập hoặc phiên hết hạn ");
      } finally {
        dispatch(setLoadingFlase());
      }
    };
    checkAuth();
  }, [dispatch]);
  return <AppRouter />;
};
const App = () => {
  return (
    <Provider store={storeRedux}>
      <AppContent />
    </Provider>
  );
};

export default App;
