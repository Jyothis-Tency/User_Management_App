import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../../components/user/auth/navbar";
import { useDispatch, useSelector } from "react-redux";
import { addImage, profileEdit } from "../../redux/userRedux/userThunk";
import { Toaster, toast } from "sonner";

function Home() {
  const [image, setImage] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.data);

  console.log("user -", user);

  useEffect(() => {
    if (user) {
      setUserDetails(user);
      setFormData(user);
    }
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSaveDetails(e) {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]{10}$/;
    const name = formData.name;
    const email = formData.email;
    const mobile = formData.mobile;

    if (name.trim() === "" || mobile.trim() === "" || mobile.trim() === "") {
      toast.error("All Fields Are Required", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    } else if (!emailPattern.test(email)) {
      toast.error("Invalid Email Pattern", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    } else if (!mobilePattern.test(mobile)) {
      toast.error("Invalid Mobile Number", {
        hideProgressBar: true,
        className: "custom-toast-error",
        autoClose: 2000,
      });
    } else {
      dispatch(profileEdit({ formData, userId: user._id }));
      setEdit(false);
    }
  }

  useEffect(() => {
    if (image) {
      dispatch(addImage({ image, userId: user._id }));
    }
  }, [image]);

  let anonymous = "http://localhost:5000/images/usericon.png";

  return (
    <>
      <Navbar />
      <div className="home-page">
        <div className="home-card">
          <Toaster />
          <div className="profile-section">
            <div className="profile-picture">
              {userDetails.image ? (
                <img
                  id="profileImage"
                  src={
                    userDetails.image
                      ? `http://localhost:5000/images/${userDetails.image}`
                      : anonymous
                  }
                  alt="Profile"
                />
              ) : (
                <div className="default-profile">
                  <i className="fas fa-user-edit"></i>
                  <p>Upload Profile Picture</p>
                </div>
              )}
              {edit && (
                <button
                  className="edit-profile-btn"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Change Picture
                </button>
              )}
              <input
                type="file"
                id="fileInput"
                className="hidden-input"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
          <div className="details-section">
            <h2>Welcome Home!</h2>
            {edit ? (
              <div className="home-details-edit">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="home-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="home-input"
                />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="home-input"
                />
                <button
                  className="save-details-btn"
                  onClick={handleSaveDetails}
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="home-details">
                <h2>User Information</h2>
                <p>Name: {userDetails.name}</p>
                <p>Email: {userDetails.email}</p>
                <p>Phone: {userDetails.mobile}</p>
                <button
                  className="edit-details-btn"
                  onClick={() => setEdit(!edit)}
                >
                  Edit Information
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
