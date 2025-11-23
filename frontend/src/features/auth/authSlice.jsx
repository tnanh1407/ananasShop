import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //  Hành động khi đăng nhập thành công !
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },

    //  Hành động khi đăng xuất
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = true;
      state.isLoading = false;
    },

    // Action tắt  loading nếu check cookie thất bại
    setLoadingFlase: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setCredentials, logout, setLoadingFlase } = authSlice.actions;
export default authSlice.reducer;

// selector tiện ích
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
