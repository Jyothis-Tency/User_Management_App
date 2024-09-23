const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB).then(() => {
      console.log("Database Connected");
    });
  } catch (error) {
    console.log("Database not Connected - ", error.message);
  }
};

module.exports = connectDB;
