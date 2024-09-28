import { createSlice } from "@reduxjs/toolkit";
import {
  adminLogin,
  editUser,
  fetchData,
  deleteUser,
  blockUser,
} from "./adminThunk";

const token = localStorage.getItem("adminToken")
  ? localStorage.getItem("adminToken")
  : null;
const userData = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : [];

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    token: token,
    userData: userData,
  },
  reducers: {
    Logout: (state, action) => {
      console.log("Logout reducer");

      localStorage.removeItem("adminToken");
      localStorage.removeItem("userData");

      state.token = null;
      state.userData = [];
      console.log(state.token);
      console.log(state.userData);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      const { token, userData } = action.payload;
      console.log("adminLoginSlice", token, userData);
      localStorage.setItem("adminToken", token);
      localStorage.setItem("userData", JSON.stringify(userData));

      state.token = token;
      state.userData = userData;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { data } = action.payload;
      localStorage.setItem("userData", JSON.stringify(data));
      state.userData = data;
    });

    builder.addCase(editUser.fulfilled, (state, action) => {
      const { userId, name, email, mobile } = action.payload;
      state.userData = state.userData.map((user) =>
        user._id == userId
          ? { ...user, name: name, email: email, mobile: mobile }
          : user
      );
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const userId = action.payload;
      state.userData = state.userData.filter((user) => user._id !== userId);
    });
    builder.addCase(blockUser.fulfilled, (state, action) => {
      const { userId, opBlocked } = action.payload;
      state.userData = state.userData.map((user) =>
        user._id == userId ? { ...user, isBlocked: opBlocked } : user
      );
    });
  },
});

export default adminSlice.reducer;

export const { Logout } = adminSlice.actions;
