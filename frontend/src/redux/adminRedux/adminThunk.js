import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:5000/admin";

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async ({ email, password, toast }, { rejectWithValue }) => {
    try {
      console.log("admin thunk");

      console.log(email, password);

      const response = await axios.post(`${url}/adminLogin`, {
        email,
        password,
      });

      console.log(response.data);
      if (response.data.status === "email") {
        toast.error("Email Not Found", {
          hideProgressBar: true,
          className: "custom-toast-error",
          autoClose: 2000,
        });
        return rejectWithValue("email not found");
      } else if (response.data.status === "pass") {
        toast.error("Incorrect Password", {
          hideProgressBar: true,
          className: "custom-toast-error",
          autoClose: 2000,
        });
        return rejectWithValue("incorrect password");
      } else {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const fetchData = createAsyncThunk("admin/fetchData", async () => {
  const response = await axios.get(`${url}/fetchData`);
  return response.data;
});

export const editUser = createAsyncThunk(
  "admin/editUser",
  async ({ name, email, mobile, userId, toast }) => {
    // console.log(name,userId);
    const response = await axios.post(`${url}/editUser`, {
      name,
      email,
      mobile,
      userId,
    });

    if (response.data.modifiedCount == 1) {
      console.log("inside modified count");
      console.log(userId, name);
      return { userId, name, email, mobile };
    } else if (
      response.data == "Access_denied" ||
      response.data == "authentication_failed"
    ) {
      toast.error("Access denied please login again", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async ({ userId, toast }) => {
    // console.log(userId);
    const response = await axios.post(`${url}/deleteUser`, { userId });
    console.log(response.data);
    if (response.data.deletedCount == 1) {
      return userId;
    } else if (
      response.data == "Access_denied" ||
      response.data == "authentication_failed"
    ) {
      return toast.error("Access denied please login again", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    }
  }
);

export const blockUser = createAsyncThunk(
  "admin/blockUser",
  async ({ userId, isBlocked, toast }) => {
    const response = await axios.post(`${url}/blockUser`, { userId });
    if (response.data.modifiedCount === 1) {
      console.log("Block success");
      let opBlocked = !isBlocked;
      return {userId, opBlocked};
    } else {
      return toast.error("Status update failed", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    }
  }
);
