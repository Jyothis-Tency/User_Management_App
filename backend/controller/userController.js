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

module.exports = {
  registerPost,
};
