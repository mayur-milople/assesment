const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization") || req.cookies.jwt;

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Access Denined",
        status: 403,
      });
    }

    const verifyUser = jwt.verify(token, "mynameisvinodbahadurthapayoutuber");
    const user = await userModel.findOne({ _id: verifyUser._id });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Not Match Data");
    return;
  }
};
