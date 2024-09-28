import axios from "axios";
const url = "http://localhost:5000";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authLogin = createAsyncThunk(
  "user/authLogin",
  async ({ email, password, toast }, thunkAPI) => {
    try {
      console.log("authLogin triggered");

      const response = await axios.post(`${url}/verifyLogin`, {
        email,
        password,
      });

      if (response.data.status == "usernotfound") {
        toast.error("User Not Found", {
          hideProgressBar: true,
          className: "custom-toast-error",
          autoClose: 2000,
        });
        return rejectWithValue("user not found");
      } else if (response.data.status === "incorrect") {
        toast.error("Incorrect Password", {
          hideProgressBar: true,
          className: "custom-toast-error",
          autoClose: 2000,
        });
        return rejectWithValue("incorrect");
      } else if (response.data.status === "userblocked") {
        toast.error("User is blocked by admin", {
          hideProgressBar: true,
          className: "custom-toast-error",
          autoClose: 2000,
        });
        return rejectWithValue("userblocked");
      } else {
        return response.data;
      }
    } catch (error) {
      console.error(error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const registerThunk = async ({
  name,
  email,
  mobile,
  password,
  toast,
}) => {
  console.log(
    "registerThunk triggered - ",
    name,
    email,
    mobile,
    password,
    toast
  );
  const response = await axios.post(`${url}/register`, {
    name,
    email,
    mobile,
    password,
  });
  console.log("response.data -", response.data.status);

  if (response.data.status === "emailExist") {
    toast.error("This email already exists.", {
      hideProgressBar: true,
      className: "custom-toast-error",
      autoClose: 2000,
    });
  } else if (response.data.status === "success") {
    return true;
  }
};

export const addImage = createAsyncThunk(
  "user/addImage",
  async ({ image, userId }) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("userId", userId);

    const response = await axios.post(`${url}/addImg`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    response.data;
  }
);

export const profileEdit = createAsyncThunk(
  "user/profileEdit",
  async ({ formData, userId }) => {
    console.log(formData);
    const response = await axios.post(`${url}/profileEdit`, {
      ...formData,
      userId,
    });
    console.log(`response going - ${response.data}`);
    return response.data;
  }
);
