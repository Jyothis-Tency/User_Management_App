const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();

const app = express();

connectDB();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/backend/assets", express.static(path.join(__dirname, "./assets")));
// app.use("/api/users", require("./router/userRoute"));
// app.use("/api/admin", require("./router/adminRoute"));

app.listen(port, () => {
  console.log("Server Started");
});
