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

          // login details table data save
          const userInfo = new loginDetail({
            userId: login1._id,
            type: login1.signed_in_method,
            login_at: login1.login_at,
          });

          await userInfo.save();

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
  var countRegisterSimpleArray = [];
  var countRegisterSocialArray = [];
  var countLoginSimpleArray = [];
  var countLoginSocialArray = [];
  var countTotalLogin = [];
  var currentDate = new Date();
  for (let index = 0; index < 11; index++) {
    const date = moment(currentDate).subtract(index, "d").format("YYYY-MM-DD");
    var loginSimpleResult = await loginDetail.aggregate([
      {
        $addFields: {
          onlyDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$login_at",
            },
          },
        },
      },
      {
        $match: {
          onlyDate: {
            $eq: date,
          },
          type: "simple",
        },
      },
    ]);

    var loginResult = await loginDetail.aggregate([
      {
        $addFields: {
          onlyDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$login_at",
            },
          },
        },
      },
      {
        $match: {
          onlyDate: {
            $eq: date,
          },
          $or: [{ type: "google" }, { type: "facebook" }, { type: "simple" }],
        },
      },
    ]);

    var loginSocialResult = await loginDetail.aggregate([
      {
        $addFields: {
          onlyDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$login_at",
            },
          },
        },
      },
      {
        $match: {
          onlyDate: {
            $eq: date,
          },
          $or: [{ type: "google" }, { type: "facebook" }],
        },
      },
    ]);

    var registerResultSimple = await user.aggregate([
      {
        $addFields: {
          onlyDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$registered_at",
            },
          },
        },
      },
      {
        $match: {
          onlyDate: {
            $eq: date,
          },
          signed_in_method: "simple",
        },
      },
    ]);

    var registerResultSocial = await user.aggregate([
      {
        $addFields: {
          onlyDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$registered_at",
            },
          },
        },
      },
      {
        $match: {
          onlyDate: {
            $eq: date,
          },

          $or: [
            { signed_in_method: "google" },
            { signed_in_method: "facebook" },
          ],
        },
      },
    ]);
    array.push(date);

    // console.log("register", registerResultSocial);

    countRegisterSimpleArray.push(registerResultSimple.length);
    countRegisterSocialArray.push(registerResultSocial.length);
    countLoginSimpleArray.push(loginSimpleResult.length);
    countLoginSocialArray.push(loginSocialResult.length);
    countTotalLogin.push(loginResult.length);
  }

  var simpleRegister = { array, countRegisterSimpleArray };
  var socialRegister = { array, countRegisterSocialArray };
  var simpleLogin = { array, countLoginSimpleArray };
  var socialLogin = { array, countLoginSocialArray };
  var totalLogin = { array, countTotalLogin };

  return res.status(200).json({
    success: true,
    status: 200,
    data: {
      simple: { simpleRegister, simpleLogin },
      social: { socialRegister, socialLogin },
      total: { totalLogin },
    },
    message: "request success",
  });
};

exports.searchUserDetails = async (req, res) => {
  

  const search = await user.find({
    $or: [
      { username: { $regex: req.params.key } },
      { email: { $regex: req.params.key } },
    ],
  });

  if (search) {
    return res.status(200).json({
      success: true,
      status: 200,
      data: search,
      message: "user found",
    });
  } else {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "user not found",
    });
  }
};

exports.registerDateFilter = async (req, res) => {
  const sDate = new Date(req.body.sdate);

  const startDate = moment(sDate).format("YYYY-MM-DD");

  const eDate = new Date(req.body.edate);

  const endDate = moment(eDate).format("YYYY-MM-DD");

  var registerSimpleResult = await user.aggregate([
    {
      $addFields: {
        registerDate: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$registered_at",
          },
        },
      },
    },
    {
      $match: {
        registerDate: {
          $gte: startDate,
          $lte: endDate,
        },
        signed_in_method: "simple",
      },
    },
  ]);

  var registerResultSocial = await user.aggregate([
    {
      $addFields: {
        registerDate: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$registered_at",
          },
        },
      },
    },
    {
      $match: {
        registerDate: {
          $gte: startDate,
          $lte: endDate,
        },
        $or: [{ signed_in_method: "google" }, { signed_in_method: "facebook" }],
      },
    },
  ]);

  return res.status(200).json({
    success: true,
    status: 200,
    data: { registerSimpleResult, registerResultSocial },
    message: "all register date filter found",
  });
};

exports.loginDateFilter = async (req, res) => {
  const sDate = new Date(req.body.sdate);

  const startDate = moment(sDate).format("YYYY-MM-DD");

  const eDate = new Date(req.body.edate);

  const endDate = moment(eDate).format("YYYY-MM-DD");

  var loginResult = await loginDetail.aggregate([
    {
      $addFields: {
        loginDate: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$login_at",
          },
        },
      },
    },
    {
      $match: {
        loginDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
  ]);

  var loginSocialResult = await loginDetail.aggregate([
    {
      $addFields: {
        loginDate: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$login_at",
          },
        },
      },
    },
    {
      $match: {
        loginDate: {
          $gte: startDate,
          $lte: endDate,
        },
        $or: [{ type: "google" }, { type: "facebook" }],
      },
    },
  ]);

  return res.status(200).json({
    success: true,
    status: 200,
    data: { loginResult, loginSocialResult },
    message: "all login date filter found",
  });
};
