import React, { useEffect, useState } from "react";
import "./AdminHome.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../redux/adminRedux/adminSlice";
import {
  deleteUser,
  editUser as updateUserData,
  fetchData,
  blockUser,
} from "../../redux/adminRedux/adminThunk";
import { registerThunk } from "../../redux/userRedux/userThunk";
import registerValidation from "../../validation/userValidation";
import { Toaster, toast } from "sonner";
import Swal from "sweetalert2";

const AdminHome = () => {
  const userData = useSelector((store) => store.admin.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null); // Track the user being edited
  const [editUserDetails, setEditUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  }); // New state for the user being edited
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  let { name, email, mobile, password, confirmPassword } = newUser;

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    if (searchTerm) {
      const filteredData = userData.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setData(filteredData); // Update data with filtered results
    } else {
      setData(userData); // If search is empty, show all users
    }
  };

  // Function to handle adding a new user
  const newUserOnChange = (e) => {
    setNewUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to handle editing an existing user
  const editUserOnChange = (e) => {
    setEditUserDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (search) {
      setData(userData.filter((user) => user.name.includes(search)));
    } else {
      setData(userData);
    }
  }, [search, userData]);

  userData.filter((user) =>
    user.name === "War Cat" ? console.log(user) : null
  );

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      setData(userData);
    }
  }, [userData]);

  // Function to save the edited user data
  function handleSave(userId) {
    const { name, email, mobile } = editUserDetails; // Extract the fields being edited
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]{10}$/;

    if (name === "" || email === "" || mobile === "") {
      toast.error(
        "Enter a valid name, email, and mobile. Name must contain at least 3 characters",
        {
          hideProgressBar: true,
          className: "customer-toast-error",
          autoClose: 2000,
        }
      );
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
    } else {
      dispatch(updateUserData({ name, email, mobile, userId, toast })).then(
        () => {
          setEdit(null); // Exit edit mode
        }
      );
    }
  }

  function delUser(userId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          confirmButtonColor: "#000",
        }).then(() => {
          dispatch(deleteUser({ userId, toast }));
        });
      }
    });
  }
  function blockThisUser(userId, isBlocked) {
    Swal.fire({
      title: "Are you sure, Block/Unblock this person?",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success!",
          confirmButtonColor: "#000",
        }).then(() => {
          dispatch(blockUser({ userId, isBlocked, toast }));
        });
      }
    });
  }

  function logout() {
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
        }).then(() => {
          dispatch(Logout());
          navigate("/admin/login");
        });
      }
    });
  }

  async function handleAddUser() {
    try {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobilePattern = /^[0-9]{10}$/;
      const passwordPattern =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

      if (
        name === "" ||
        email === "" ||
        mobile === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        toast.error("Enter all inputs.", {
          hideProgressBar: true,
          className: "customer-toast-error",
          autoClose: 2000,
        });
      } else if (!emailPattern.test(email)) {
        toast.error("Invalid Email.", {
          hideProgressBar: true,
          className: "customer-toast-error",
          autoClose: 2000,
        });
      } else if (!mobilePattern.test(mobile)) {
        toast.error("Invalid Mobile Number.", {
          hideProgressBar: true,
          className: "customer-toast-error",
          autoClose: 2000,
        });
      } else if (!passwordPattern.test(password)) {
        toast.error(
          "Password must be at least 8 characters long, contain one number, and one special character.",
          {
            hideProgressBar: true,
            className: "customer-toast-error",
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
        if (validation) {
          const response = await registerThunk({
            name,
            email,
            mobile,
            password,
            toast,
          });
          if (response) {
            setShowModal(false); // Close the modal
            setNewUser({
              name: "",
              email: "",
              mobile: "",
              password: "",
              confirmPassword: "",
            });
            dispatch(fetchData());
          }
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <div className="admin-home">
        <Toaster />
        <div className="navbar">
          <div className="navbar-brand">Admin Dashboard</div>
          <a href="#" onClick={logout}>
            Logout
          </a>
        </div>
        <div className="admincard">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
            />
            {search && ( // Show the "Clear" button only when search is not empty
              <button
                onClick={() => {
                  setSearch("");
                  setData(userData);
                }}
              >
                Clear
              </button>
            )}
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) &&
                  data.map((user, index) => (
                    <tr key={index}>
                      {edit === user._id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              name="name"
                              value={editUserDetails.name}
                              onChange={editUserOnChange}
                              className="input"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="email"
                              value={editUserDetails.email}
                              onChange={editUserOnChange}
                              className="input"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="mobile"
                              value={editUserDetails.mobile}
                              onChange={editUserOnChange}
                              className="input"
                            />
                          </td>
                          <td>{user.is_blocked ? "Blocked" : "UnBlocked"}</td>
                          <td>
                            <button
                              className="button button-save"
                              onClick={() => handleSave(user._id)}
                            >
                              Save
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.mobile}</td>
                          <td>
                            <button
                              className="button button-block"
                              onClick={() =>
                                blockThisUser(user._id, user.isBlocked)
                              }
                              style={{
                                backgroundColor: user.isBlocked ? "gray" : "",
                              }}
                            >
                              {user.isBlocked ? "Blocked" : "UnBlocked"}
                            </button>
                          </td>
                          <td>
                            <button
                              className="button button-edit"
                              onClick={() => {
                                setEdit(user._id); // Set edit mode
                                setEditUserDetails({
                                  name: user.name,
                                  email: user.email,
                                  mobile: user.mobile,
                                }); // Set initial values
                              }}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              className="button button-delete"
                              onClick={() => delUser(user._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
            <button onClick={() => setShowModal(true)}>Add User</button>
          </div>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Add User</h2>
                <input
                  type="text"
                  placeholder="Enter user name"
                  name="name"
                  value={name}
                  onChange={newUserOnChange}
                />
                <input
                  type="text"
                  placeholder="Enter user email"
                  name="email"
                  value={email}
                  onChange={newUserOnChange}
                />
                <input
                  type="text"
                  placeholder="Enter user mobile"
                  name="mobile"
                  value={mobile}
                  onChange={newUserOnChange}
                />
                <input
                  type="text"
                  placeholder="Enter user password"
                  name="password"
                  value={password}
                  onChange={newUserOnChange}
                />
                <input
                  type="text"
                  placeholder="Confirm user password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={newUserOnChange}
                />
                <button onClick={handleAddUser}>Add</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
