import axios from "axios";
const url = "http://localhost:5000";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
  console.log("response.data - ", response.data);

  if (response.data.status === "emailExists") {
    toast.error("This email already exists.", {
      hideProgressBar: true,
      className: "custom-toast-error",
      autoClose: 2000,
    });
  } else if (response.data.status === "success") {
    return true;
  }
};
