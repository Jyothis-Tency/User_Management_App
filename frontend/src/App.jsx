import React from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import UserSignUp from "./components/user/auth/register";
import UserLogin from "./components/user/auth/login";
import AdminHome from "./components/admin/AdminHome";
import Home from "./pages/user/home";
import Login from "./pages/admin/Login";
import UserAuth from "./components/user/Authent/userAuth";
import AdminAuth from "./components/admin/Authent/adminAuth";

import configStore from "./redux/store";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={configStore}>
        <Routes>
          <Route path="/login" element={<UserLogin />}></Route>
          <Route path="/register" element={<UserSignUp />}></Route>
          <Route
            path="/"
            element={
              <UserAuth>
                <Home />
              </UserAuth>
            }
          ></Route>
          <Route path="/admin/login" element={<Login />}></Route>
          <Route
            path="/admin/home"
            element={
              <AdminAuth>
                <AdminHome />
              </AdminAuth>
            }
          ></Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
