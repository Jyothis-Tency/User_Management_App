const express = require("express");
const Router = express.Router();
const userController = require("../controller/userController");
const upload = require("../utils/multer");

Router.post("/register", userController.registerPost);

Router.post("/verifyLogin", userController.verifyLogin);

Router.post("/addImg", upload.single("file"), userController.addImage);

Router.post("/profileEdit", userController.profileEdit);

module.exports = Router;
