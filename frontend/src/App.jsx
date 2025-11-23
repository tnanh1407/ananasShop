import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { setCredentials, setLoadingFlase } from "./features/auth/authSlice.js";
import { getUserProfile } from "./api/userAPI.js";
import { storeRedux } from "./app/store";

const AppContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getUserProfile();
        if (user) {
          dispatch(setCredentials({ user }));
        }
      } catch (err) {
        console.log("Chưa đăng nhập hoặc phiên hết hạn : ", err);
      } finally {
        dispatch(setLoadingFlase());
      }
    };
    checkAuth();
  }, [dispatch]);
};
const App = () => {
  return (
    <Provider store={storeRedux}>
      <AppContent />
    </Provider>
  );
};

export default App;
