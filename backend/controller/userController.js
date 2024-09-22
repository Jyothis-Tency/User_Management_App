const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  console.log("registerUser triggered");
  console.log(process.env);

  const { name, email, password } = req.body;

  if (!name || !email || password) {
    res.status(400);
    throw new Error("fill the registration form");
  }

  const userExist = await UserActivation.findOne({ email });
});
