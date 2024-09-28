import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserAuth({ children }) {
  console.log("UserAuth triggered");

  const navigate = useNavigate();
  const token = useSelector((store) => store.user.token);
  console.log(`Token - ${token}`);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  if (token) {
    return children;
  }
}

export default UserAuth;
