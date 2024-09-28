const Admin = require("../models/adminSchema");
const User = require("../models/userSchema");
const { generateToken } = require("../config/jwtConfig");
const bcrypt = require("bcryptjs");

const adminLogin = async (req, res) => {
  try {
    console.log("adminLogin triggered");

    const { email, password } = req.body;
    console.log(email, password);

    const adminData = await Admin.findOne({ email: email });

    console.log(`Admin Data - ${adminData}`);

    if (adminData) {
      console.log("Email okay");

      const isPassed = await bcrypt.compare(password, adminData.password);
      if (isPassed) {
        console.log("Password okay");

        const token = await generateToken({ email: email });
        const userData = await User.find({});
        console.log(token, userData);

        res.json({ token: token, userData: userData });
      } else {
        console.log("password error");

        res.json({ status: "pass" });
      }
    } else {
      console.log("Email error");

      res.json({ status: "email" });
    }
  } catch (error) {
    console.error(error.message);
  }
};

const fetchData = async (req, res) => {
  try {
    console.log("fetchData triggered");

    const data = await User.find({});
    res.json({ data: data });
  } catch (error) {
    console.log(error.message);
  }
};

const editUser = async (req, res) => {
  try {
    console.log("admin editUser");

    const { name, email, mobile } = req.body;
    console.log(name, email, mobile);

    const id = req.body.userId;
    const updateUser = await User.updateOne(
      { _id: id },
      { name: name, email: email, mobile: mobile }
    );
    const updatedUser = await User.findOne({ _id: id });
    console.log(updatedUser);

    console.log(updateUser);
    res.json(updateUser);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.body.userId;
    const removeUser = await User.deleteOne({ _id: id });
    res.json(removeUser);
  } catch (error) {
    console.error(error.message);
  }
};

const blockUser = async (req, res) => {
  try {
    console.log("blockUser backend");

    const id = req.body.userId;
    console.log(id);

    const user = await User.findOne({ _id: id });
    console.log("user -", user);

    let blockUser;
    if (user.isBlocked === true) {
      blockUser = await User.updateOne(
        { _id: id },
        {
          isBlocked: false,
        }
      );
    } else {
      blockUser = await User.updateOne(
        { _id: id },
        {
          isBlocked: true,
        }
      );
    }
    res.json(blockUser);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  adminLogin,
  fetchData,
  editUser,
  deleteUser,
  blockUser,
};
