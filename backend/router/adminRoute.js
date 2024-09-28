const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controller/adminController");

adminRouter.post("/adminLogin", adminController.adminLogin);
adminRouter.get("/fetchData", adminController.fetchData);
adminRouter.post("/editUser", adminController.editUser);
adminRouter.post("/deleteUser", adminController.deleteUser);
adminRouter.post("/blockUser", adminController.blockUser);
module.exports = adminRouter;
