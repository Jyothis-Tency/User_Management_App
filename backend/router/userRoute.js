const express = require("express");
const Router = express.Router();
const userController = require("../controller/userController");
const upload = require("../utils/multer");

Router.post("/verifyLogin", userController.registerPost);

module.exports=Router