const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./router/userRoute");
const adminRoute = require("./router/adminRoute");
const connectDB = require("./config/db");
dotenv.config();

const app = express();

connectDB();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "/assets")));

app.use("/", userRoute);
app.use("/admin",adminRoute)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
