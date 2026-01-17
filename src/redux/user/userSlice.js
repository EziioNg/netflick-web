import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

// import axios from 'axios'
import { API_ROOT } from "~/utils/constants";
import authorizedAxiosInstance from "~/utils/authorizeAxios";

// khởi tạo giá trị State của 1 slice trong Redux
const initialState = {
  currentUser: null,
};

// các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu redux, dùng middleware createAsyncThunk đi kèm extraReducers
export const loginUserAPI = createAsyncThunk(
  "user/loginUserAPI",
  async (data) => {
    const response = await authorizedAxiosInstance.post(
      `${API_ROOT}/v1/users/login`,
      data,
    );
    return response.data; // axios trả về kết quả qua property là data
  },
);

export const logoutUserAPI = createAsyncThunk(
  "user/logoutUserAPI",
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete(
      `${API_ROOT}/v1/users/logout`,
    );
    if (showSuccessMessage) {
      toast.success("Log out successfully");
    }
    return response.data;
  },
);

export const updateUserAPI = createAsyncThunk(
  "user/updateUserAPI",
  async (data) => {
    const response = await authorizedAxiosInstance.put(
      `${API_ROOT}/v1/users/update`,
      data,
    );
    return response.data;
  },
);

// khởi tạo 1 slice trong kho lưu trữ - Redux Store
export const userSlice = createSlice({
  name: "user",
  initialState,
  // reducers: nơi xử lý dữ liệu dồng bộ
  reducers: {},
  // extraReducers: nơi xử lý dữ liệu bất dồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      // xử lý api đăng nhập
      // action.payload ở đây là response.data trả về ở trên
      const user = action.payload;
      // Update lại dữ liệu của currentUser sau khi xử lý
      state.currentUser = user;
      // console.log('current user: ', state.currentUser)
    });
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      // xử lý api đăng xuất
      // Xóa currentUser trong redux
      state.currentUser = null;
    });
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      // xử lý api update
      const user = action.payload; // lấy thông tin update gán cho biến user
      // Update lại dữ liệu của currentUser sau khi xử lý
      state.currentUser = user;
    });
  },
});

// Actions: Là nơi dành cho các component bên dưới cập nhật lại dữ liệu của redux store bằng cách gọi dispatch() (chạy đồng bộ)
// không có các properties actions vì các actions được tạo tự động bằng redux theo tên của reducer
// export const {} = user.actions

// Selectors: nơi dành cho các component bên dưới lấy dữ liệu từ kho redux store ra sử dụng bằng cách dùng hook useSelector()
export const selectCurrentUser = (state) => {
  return state.user.currentUser;
};

// gán reducer của user cho activeUserReducer và export
export const activeUserReducer = userSlice.reducer;
