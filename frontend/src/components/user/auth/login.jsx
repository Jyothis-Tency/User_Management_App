import React, { useEffect, useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { authLogin } from "../../../redux/userRedux/userThunk";

function UserLogin() {
  console.log("UserLogin triggered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user.data);
  console.log(`userData - ${userData}`);

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (email === "" || password === "") {
      return toast.error("Enter email and password", {
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
    } else if (!passwordPattern.test(password)) {
      return toast.error(
        "Password must be at least 8 characters long, contain one number, and one special character.",
        {
          hideProgressBar: true,
          className: "custom-toast-error",
          autoClose: 2000,
        }
      );
    } else {
      console.log(`Email and Password - ${email}, ${password}`);
      dispatch(authLogin({ email, password, toast }));
    }
  };

  return (
    <>
      <div className="container">
        <Toaster position="top-center" />
        <div className="login-box">
          <div className="form-side">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit">Login</button>

              <span>
                Doesn't have an account?{" "}
                <Link to={"/register"}>Register here!!!</Link>
              </span>
            </form>
          </div>
          <div className="image-side">
            <img src="/src/assets/usericon.png" alt="Nature" />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
