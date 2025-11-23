import axios from "axios";
const API_URL = "http://localhost:8081/api/user";

axios.defaults.withCredentials = true; // Cấu hình để Axios luôn gửi Cookie kèm theo request

// --- 1. AUTH: ĐĂNG KÝ ---
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (err) {
    console.log(
      "ERROR FUNCTION registerUser : ",
      err.response ? err.response.data : { message: err.message }
    );
    throw err.response ? err.response.data : { message: err.message };
  }
};

// --- 2. AUTH: ĐĂNG NHẬP ---

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;
  } catch (err) {
    console.log(
      "ERROR FUNCTION loginUser : ",
      err.response ? err.response.data : { message: err.message }
    );
    throw err.response ? err.response.data : { message: err.message };
  }
};

// --- 3. ĐĂNG XUẤT (POST /logout) ---
export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
  } catch (err) {
    console.log(err);
  }
};

// --- 4. LẤY TẤT CẢ USER (GET /) ---
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (err) {
    console.log(
      "ERROR FUNCTION registerUser : ",
      err.response ? err.response.data : { message: err.message }
    );
    throw err.response ? err.response.data : { message: err.message };
  }
};

// --- 5. LẤY 1 USER (GET /:id) ---
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.log(
      "ERROR FUNCTION registerUser : ",
      err.response ? err.response.data : { message: err.message }
    );
    throw err.response ? err.response.data : { message: err.message };
  }
};

// --- 6. CẬP NHẬT USER (PATCH /:id) ---
export const updateUser = async (id, updateData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, updateData);
    return response.data;
  } catch (err) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

// --- 7. XÓA USER (DELETE /:id) ---
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

// --- 8. LẤY THÔNG TIN PROFILE (Check Cookie) ---

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  } catch (err) {
    throw err.response ? err.response.data : { message: err.message };
  }
};
