import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice.js";

export const storeRedux = configureStore({
  reducer: {
    auth: authSlice,
  },
});
