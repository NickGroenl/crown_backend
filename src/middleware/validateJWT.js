const { verifyUserJWT } = require("../libs/jwt");
const User = require("../models/user");
let _ = require("lodash");

const validateJWT = async (req, res, next) => {
  const token = _.get(req.cookies, "access-token");
  if (!token) {
    return res.status(400).json({
      request: false,
      message: "Access token is missing",
    });
  }

  try {
    const user = await verifyUserJWT(token);
    if (!user) {
      return res.status(400).json({
        request: false,
        message: "User not found",
      });
    }

    req.user = _.pick(user, User.returnable);
    next();
  } catch (error) {
    return res.status(400).json({
      request: false,
      message: "Invalid token",
      data: error,
    });
  }
};

module.exports = { validateJWT };