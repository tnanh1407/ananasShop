import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice.jsx";

export const storeRedux = configureStore({
  reducer: {
    auth: authSlice,
  },
});
