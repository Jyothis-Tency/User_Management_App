import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminAuth = ({ children }) => {
  console.log("Admin Authentication");
  const navigate = useNavigate();

  const token = useSelector((store) => store.admin.token);
  console.log("Admin Token -", token);

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, []);

  if (token) {
    return children;
  }
};

export default AdminAuth;
