import { createSlice } from "@reduxjs/toolkit";
import { authLogin, addImage, profileEdit } from "./userThunk";

const data = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : null;
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: data,
    token: token,
  },
  reducers: {
    Logout: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("data");
      state.data = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.fulfilled, (state, action) => {
        const { data, token } = action.payload;
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("token", token);
        state.data = data;
        state.token = token;
      })
      .addCase(addImage.fulfilled, (state, action) => {
        const { data } = action.payload;
        localStorage.setItem("data", JSON.stringify(data));
        state.data = data;
      })
      .addCase(profileEdit.fulfilled, (state, action) => {
        const { data } = action.payload;
        localStorage.setItem("data", JSON.stringify(data));
        state.data = data;
      });
  },
});

export const { Logout } = userSlice.actions;

export default userSlice.reducer;
