const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../../config");

const generateJWT = (data, expiresIn = "1d") => {
  return jwt.sign(data, config.JWT_SECRET, { expiresIn });
};

const verifyUserJWT = async (token) => {
  const { userId } = jwt.verify(token, config.JWT_SECRET);
  let user =  await User.findById(userId);
  return user;
};

module.exports = {
  generateJWT,
  verifyUserJWT,
};
