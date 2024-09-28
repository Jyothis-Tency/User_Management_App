import React, { useEffect, useState } from "react";
import "./adminLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { adminLogin } from "../../redux/adminRedux/adminThunk";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminData = useSelector((store) => store.admin.userData);
  console.log(`adminData - ${adminData}`);

  // useEffect(() => {
  //   if (adminData) {
  //     navigate("/admin/home");
  //   }
  // }, [adminData]);

  const handleLogin = (e) => {
    e.preventDefault();

    const trimEmail = email.trim();
    const trimPass = password.trim();
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (trimEmail === "" || trimPass === "") {
      return toast.error("All Fields Are Required", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    } else if (!emailRegex.test(trimEmail)) {
      return toast.error("Invalid Email", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    } else {
      console.log("dispatch");
      console.log(email, password);

      dispatch(adminLogin({ email, password, toast }))
      navigate('/admin/home')
    }
  };

  return (
    <>
      <div className="admin-log">
        <Toaster position="top-center" />
        <div className="login-container">
          <h2 className="login-title">Admin Login</h2>
          <form className="login-title">
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button
              type="submit"
              className="login-button"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
