import React from "react";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Logout } from "../../../redux/userRedux/userSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      text: "You will need to log in again to access your account.",

      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logout",
          confirmButtonColor: "#000",
        }).then((result) => {
          dispatch(Logout());
          navigate("/login");
        });
      }
    });
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">User Management System</div>
      <ul className="navbar-links">
        <li>
          <a onClick={logout}>LogOut</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
