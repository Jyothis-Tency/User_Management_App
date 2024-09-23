const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const secret = crypto.randomBytes(64).toString("hex");
console.log(`Secret key - ${secret}`);

const generateToken = (payload) => {
  const secretKey = secret;
  const options = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

module.exports = { generateToken };
