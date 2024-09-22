const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    let connect = await mongoose.connect("mongodb://127.0.0.1:27017/redux_app");

    console.log("MongoDB connect");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
