const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const ApiFeatures = require("../utils/apifeatures");
const loginDetail = require("../models/loginDetailsModel");
const moment = require("moment");

exports.createUser = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const signed_in_method = req.body.signed_in_method;

    let adminData = await user.find({ username });

    if (adminData.length > 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "userAlreadyRegistered",
      });
    } else {
      const userData = new user({
        username,
        email,
        password,
        phone,
        signed_in_method,
      });

      userData.password = userData.generateHash(password);

      const result = await userData.save();

      res.status(201).json({
        success: true,
        status: 201,
        data: result,
        message: "user register successfully",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
    return;
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "plz fill the field property",
      });
    } else {
      const login = await user.findOne({ username });

      //   console.log(login);

      if (!login) {
        return res.status(401).json({
          success: false,
          status: 401,
          message: "Invalid username or password",
        });
      } else {
        const isPasswordMatched = login.validPassword(password);

        // console.log(isPasswordMatched);

        if (!isPasswordMatched) {
          return res.status(401).json({
            success: false,
            status: 401,
            message: "password are not matched",
          });
        } else {
          const token = await login.generateAuthToken();

          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 30 * 24 * 3600 * 10000),
            httpOnly: true,
          });

          // login details table data save
          const userInfo = new loginDetail({
            userId: login._id,
            type: login.signed_in_method,
            login_at: login.login_at,
          });

          await userInfo.save();
          return res.status(200).json({
            success: true,
            status: 200,
            token,
            data: login,
            message: "user login successfully",
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

exports.googleandfblogin = async (req, res) => {
  try {
    const { username, email, type } = req.body;

    if (!username || !type || !email) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "plz fill the field property",
      });
    } else {
      const login = await user.findOne({
        username,
        email,
        signed_in_method: type,
      });

      // console.log(login);

      if (!login) {
        const userData = new user({
          username,
          email,
          //   email:username,
          // password:username,
          signed_in_method: type,
        });

        userData.password = userData.generateHash(username);

        const result = await userData.save();
        const login1 = await user.findOne({ username });

        const isPasswordMatched = login1.validPassword(username);

        // console.log(isPasswordMatched);

        if (!isPasswordMatched) {
          return res.status(401).json({
            success: false,
            status: 401,
            message: "password are not matched",
          });
        } else {
          const token = await login1.generateAuthToken();

          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 30 * 24 * 3600 * 10000),
            httpOnly: true,
          });

          return res.status(200).json({
            success: true,
            status: 200,
            token,
            data: login1,
            message: "user login successfully",
          });
        }
      } else {
        const isPasswordMatched = login.validPassword(username);

        // console.log(isPasswordMatched);

        if (!isPasswordMatched) {
          return res.status(401).json({
            success: false,
            status: 401,
            message: "password are not matched",
          });
        } else {
          const token = await login.generateAuthToken();

          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 30 * 24 * 3600 * 10000),
            httpOnly: true,
          });

          return res.status(200).json({
            success: true,
            status: 200,
            token,
            data: login,
            message: "user login successfully",
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((curelement) => {
      return curelement.token !== req.token;
    });
    // delete for all device
    // req.user.tokens = [];

    res.clearCookie("jwt");
    await req.user.save();
    res.status(201).json({
      success: true,
      message: "logoutSuccessfull",
      status: 201,
    });
    return;
  } catch (e) {
    //Here the app crashes but we will send normal message as it is directly being displayed to user
    res.status(500).json({
      message: "logoutSuccessfull",
      status: 500,
      success: false,
      message: e.message,
    });
    return;
  }
};

exports.getUserDetailsById = async (req, res) => {
  try {
    const userId = await user.findById(req.user.id);

    if (userId) {
      return res.status(200).json({
        success: true,
        status: 200,
        data: userId,
        message: "user found",
      });
    } else {
      return res.staus(404).json({
        success: false,
        status: 404,
        message: "user not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

// update user profile

exports.updateUserProfile = async (req, res) => {
  await user
    .findOneAndUpdate(
      { _id: new ObjectId(req.user._id) },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
        },
      }
    )
    .then(() => {
      return res.status(200).json({
        success: true,
        status: 200,
        message: "user updated successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        status: 500,
        message: error.message,
      });
    });
};

// update User password
exports.updatePassword = async (req, res) => {
  const userData = await user.findById(req.user.id);

  const isPasswordMatched = await userData.validPassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Old password is incorrect",
    });
    return;
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "password does not match",
    });
    return;
  }

  userData.password = userData.generateHash(req.body.newPassword);

  await userData.save();

  const token = await userData.generateAuthToken();
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 3600 * 10000),
    httpOnly: true,
  });

  return res.status(200).json({
    success: true,
    status: 200,
    data: userData,
  });
};

//   get all users
exports.getAllUsers = async (req, res) => {
  const apiFeature = new ApiFeatures(user.find(), req.query).search().filter();

  let users = await apiFeature.query;

  return res.status(200).json({
    success: true,
    status: 200,
    data: users,
    message: "all users found",
  });
};

// Get single user (admin)
exports.getSingleUser = async (req, res) => {
  const userId = await user.findById(req.params.id);

  if (!userId) {
    res.status(404).json({
      success: false,
      status: 404,
      message: `User does not exist with Id: ${req.params.id}`,
    });
    return;
  } else {
    res.status(200).json({
      success: true,
      status: 200,
      data: userId,
      message: "admin user details found",
    });
    return;
  }
};

// exports.deleteUser = async (req, res) => {
//   const userId = await user.findByIdAndDelete(req.params.id);
//   if (!userId) {
//     res.status(400).json({
//       success: false,
//       status: false,
//       message: "User does not exist with Id: ${req.params.id}",
//     });
//     return;
//   } else {
//     res.status(200).json({
//       success: true,
//       status: 200,
//       message: "user deleted successfully",
//     });
//     return;
//   }
// };

exports.getLoginUserInfo = async (req, res) => {
  var array = [];
  var currentDate = new Date();
  for (let index = 0; index < 11; index++) {
    const date = moment(currentDate).subtract(index, "d").format("DD-MM-YYYY");
    array.push(date);
  }

  console.log("start", array);

  const userData = await loginDetail.find();

  if (userData) {
    const login_at = moment(userData.login_at).format("DD-MM-YYYY");

    // for loop create to index pass

    // for (let i = 0; i < 11; i++) {
    //   const element = array.at(i);

    //   console.log(element);
    // }

    if (array.at(0) === login_at) {
      const userCount = await loginDetail.countDocuments();
    }
    if (array.at(1) === login_at) {
      const userCount = await loginDetail.countDocuments();
      // console.log(userCount);
    }
  }
};
