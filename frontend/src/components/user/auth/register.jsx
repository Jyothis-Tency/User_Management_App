import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "sonner";
import "react-toastify/ReactToastify.css";
import "./register.css";
import Swal from "sweetalert2";

import registerValidation from "../../../validation/userValidation";
import { registerThunk } from "../../../redux/userRedux/userThunk";

const UserSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]{10}$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!name || !email || !mobile || !password || !confirmPassword) {
      return toast.error("All Fields Are Required", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    } else if (!emailPattern.test(email)) {
      return toast.error("Invalid Email format", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    } else if (!mobilePattern.test(mobile)) {
      return toast.error("Invalid mobile number. It should be 10 digits.", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    } else if (!passwordPattern.test(password)) {
      return toast.error(
        "Password must be at least 8 characters long, contain one number, and one special character.",
        {
          hideProgressBar: true,
          className: "custom-toast-error",
          autoClose: 2000,
        }
      );
    } else if (password !== confirmPassword) {
      return toast.error("Passwords not matching", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    } else {
      const validation = await registerValidation(
        name,
        email,
        mobile,
        password,
        confirmPassword,
        toast
      );
      if (validation === true) {
        const response = await registerThunk({
          name,
          email,
          mobile,
          password,
          toast,
        });
        if (response === true) {
          Swal.fire({
            title: "Success",
            text: "User Login Success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: false,
          }).then(() => {
            navigate("/login");
          });
        }
      }
    }
  }

  return (
    <>
      <div className="container">
        <Toaster position="top-center" />
        <div className="signup-box">
          <div className="image-side">
            <img src="/src/assets/usericon.png" alt="Nature" />
          </div>
          <div className="form-side">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="tel"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit">Register</button>

              <span>
                Already have an account?{" "}
                <Link to={"/login"}>Log in here!!!</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
