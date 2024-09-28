const User = require("../models/userSchema");
const { generateToken } = require("../config/jwtConfig");
const bcrypt = require("bcryptjs");

const securePass = async (password) => {
  try {
    const hashBcrypt = await bcrypt.hash(password, 10);
    if (hashBcrypt) {
      return hashBcrypt;
    }
  } catch (error) {
    console.error(error.message);
  }
};

const registerPost = async (req, res) => {
  try {
    console.log("RegisterPost triggered");
    const { name, email, mobile, password } = req.body;

    const existingMail = await User.findOne({ email: email });

    console.log(`Existing email - ${existingMail}`);

    if (existingMail) {
      res.json({ status: "emailExist" });
    } else {
      const hashPassword = await securePass(password);
      console.log(`HashedPassword - ${hashPassword}`);

      if (hashPassword) {
        console.log("Creating new user");
        const newUser = new User({
          name: name,
          email: email,
          mobile: mobile,
          password: hashPassword,
        });

        await newUser.save();
        res.json({ status: "success" });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    console.log("verifyLogin triggered");

    const { email, password } = req.body;

    const findEmail = await User.findOne({ email: email });
    console.log(`findEmail - ${findEmail}`);

    if (findEmail) {
      const passwordMatch = await bcrypt.compare(password, findEmail.password);
      if (passwordMatch) {
        if (findEmail.isBlocked===false) {
          const token = await generateToken({ id: findEmail._id });
          const data = {};

          for (let key in findEmail.toObject()) {
            if (key !== "password") {
              data[key] = findEmail[key];
            }
          }
          res.status(200).json({
            token: token,
            data: data,
          });
        } else {
          res.json({ status: "userblocked" });
        }
      } else {
        res.json({ status: "incorrect" });
      }
    } else {
      res.json({ status: "usernotfound" });
    }
  } catch (error) {
    console.error(error.message);
  }
};

const addImage = async (req, res) => {
  try {
    console.log("addImage triggered");

    const image = req.file.filename;
    const id = req.body.userId;

    const findUser = await User.findByIdAndUpdate(
      { _id: id },
      { image: image }
    );
    let data = {};

    if (findUser) {
      const Data = await User.findOne({ _id: id });

      for (let key in Data.toObject()) {
        if (key !== "password") {
          data[key] = Data[key];
        }
      }

      console.log(`This is the data - ${data}`);

      res.json({
        data: data,
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

const profileEdit = async (req, res) => {
  try {
    console.log("profileEdit triggered");

    const { name, mobile, userId } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          name: name,
          mobile: mobile,
        },
      }
    );
    if (updateUser) {
      let data = {};
      const Data = await User.findOne({ _id: userId });

      for (let key in Data.toObject()) {
        if (key !== "password") {
          data[key] = Data[key];
        }
      }
      console.log("Inside edit profile");
      res.json({
        data: data,
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  registerPost,
  verifyLogin,
  addImage,
  profileEdit,
};
