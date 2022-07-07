const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// const ApiFeatures = require("../utils/apifeatures");
const loginDetail = require("../models/loginDetailsModel");
const moment = require("moment");

// register user
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

// login user
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

// google and facebook login
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

// logout
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

// authenticate user detail
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
  // const apiFeature = new ApiFeatures(user.find(), req.query).search().filter();

  // let users = await apiFeature.query;

  const users = await user.find();

  if (users) {
    return res.status(200).json({
      success: true,
      status: 200,
      data: users,
      message: "all users found",
    });
  } else {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "user not found",
    });
  }
};

// Get single user ( by id)
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

// delete user by id
exports.deleteUser = async (req, res) => {
  const userId = await user.findByIdAndDelete(req.params.id);
  if (!userId) {
    res.status(400).json({
      success: false,
      status: false,
      message: "User does not exist with Id: ${req.params.id}",
    });
    return;
  } else {
    res.status(200).json({
      success: true,
      status: 200,
      message: "user deleted successfully",
    });
    return;
  }
};

// last 10 days login and register user count and graph
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

// serach by username,email,phone
exports.searchUserDetails = async (req, res) => {
  let queryStr = JSON.stringify(req.params.key);

  queryStr = queryStr.replace(/^[0-9]{10}$/g, (key) => `$${key}`);

  const phonesearch = JSON.parse(queryStr);

  const search = await user.find({
    $or: [
      { username: { $regex: req.params.key } },
      { email: { $regex: req.params.key } },
      { phone: phonesearch },
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

// register date range filter graph
exports.registerDateFilter = async (req, res) => {
  const sDate = new Date(req.body.sdate);

  const startDate = moment(sDate).format("YYYY-MM-DD");

  const eDate = new Date(req.body.edate);

  const endDate = moment(eDate).format("YYYY-MM-DD");

  var listDate = [];
  var countRegisterSimpleArray = [];
  var countRegisterSocialArray = [];
  const currentDate = moment().format("YYYY-MM-DD");

  if (startDate === endDate) {
    listDate.push(startDate);

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
            $eq: startDate,
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
            $eq: startDate,
          },
          $or: [
            { signed_in_method: "google" },
            { signed_in_method: "facebook" },
          ],
        },
      },
    ]);

    countRegisterSimpleArray.push(registerSimpleResult.length);
    countRegisterSocialArray.push(registerResultSocial.length);

    var simpleRegister = { listDate, countRegisterSimpleArray };
    var socialRegister = { listDate, countRegisterSocialArray };

    return res.status(201).json({
      success: true,
      status: 201,
      data: { simpleRegister, socialRegister },
      message: "all login date filter found",
    });
  } else if (startDate === currentDate) {
    endDate === currentDate;
    listDate.push(startDate);

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
            $eq: startDate,
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
            $eq: startDate,
          },
          $or: [
            { signed_in_method: "google" },
            { signed_in_method: "facebook" },
          ],
        },
      },
    ]);
    countRegisterSimpleArray.push(registerSimpleResult.length);
    countRegisterSocialArray.push(registerResultSocial.length);

    var simpleRegister = { listDate, countRegisterSimpleArray };
    var socialRegister = { listDate, countRegisterSocialArray };

    return res.status(201).json({
      success: true,
      status: 201,
      data: { simpleRegister, socialRegister },
      message: "all login date filter found",
    });
  } else {
    while (req.body.sdate < req.body.edate) {
      req.body.sdate = sDate.toISOString().slice(0, 10);
      var datefilter = req.body.sdate;
      listDate.push(datefilter);
      sDate.setDate(sDate.getDate() + 1);

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
              $eq: datefilter,
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
              $eq: datefilter,
            },
            $or: [
              { signed_in_method: "google" },
              { signed_in_method: "facebook" },
            ],
          },
        },
      ]);

      countRegisterSimpleArray.push(registerSimpleResult.length);
      countRegisterSocialArray.push(registerResultSocial.length);
    }

    const dateRange = listDate.reverse();
    const userSimpleRange = countRegisterSimpleArray.reverse();
    const userSocialRange = countRegisterSocialArray.reverse();

    var simpleRegister = { dateRange, userSimpleRange };
    var socialRegister = { dateRange, userSocialRange };

    return res.status(201).json({
      success: true,
      status: 201,
      data: { simpleRegister, socialRegister },
      message: "all login date filter found",
    });
  }
};

// login date range filter graph
exports.loginDateFilter = async (req, res) => {
  const sDate = new Date(req.body.sdate);

  const startDate = moment(sDate).format("YYYY-MM-DD");

  const eDate = new Date(req.body.edate);

  const endDate = moment(eDate).format("YYYY-MM-DD");

  var listDate = [];
  var countTotalLogin = [];
  var countLoginSocialArray = [];

  const currentDate = moment().format("YYYY-MM-DD");

  if (startDate === endDate) {
    listDate.push(startDate);

    var loginDateResult = await loginDetail.aggregate([
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
            $eq: startDate,
          },
        },
      },
    ]);

    var loginSocialDateResult = await loginDetail.aggregate([
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
            $eq: startDate,
          },
          $or: [{ type: "google" }, { type: "facebook" }],
        },
      },
    ]);

    countTotalLogin.push(loginDateResult.length);
    countLoginSocialArray.push(loginSocialDateResult.length);

    var totalLogin = { listDate, countTotalLogin };
    var socialLogin = { listDate, countLoginSocialArray };

    return res.status(201).json({
      success: true,
      status: 201,
      data: { totalLogin, socialLogin },
      message: "all login date filter found",
    });
  } else if (startDate === currentDate) {
    endDate === currentDate;
    listDate.push(startDate);

    var loginDateResult = await loginDetail.aggregate([
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
            $eq: startDate,
          },
        },
      },
    ]);

    var loginSocialDateResult = await loginDetail.aggregate([
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
            $eq: startDate,
          },
          $or: [{ type: "google" }, { type: "facebook" }],
        },
      },
    ]);

    countTotalLogin.push(loginDateResult.length);
    countLoginSocialArray.push(loginSocialDateResult.length);

    var totalLogin = { listDate, countTotalLogin };
    var socialLogin = { listDate, countLoginSocialArray };

    return res.status(201).json({
      success: true,
      status: 201,
      data: { totalLogin, socialLogin },
      message: "all login date filter found",
    });
  } else {
    while (req.body.sdate < req.body.edate) {
      req.body.sdate = sDate.toISOString().slice(0, 10);
      var datefilter = req.body.sdate;
      listDate.push(datefilter);
      sDate.setDate(sDate.getDate() + 1);

      var loginDateResult = await loginDetail.aggregate([
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
              $eq: datefilter,
            },
          },
        },
      ]);

      var loginSocialDateResult = await loginDetail.aggregate([
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
              $eq: datefilter,
            },
            $or: [{ type: "google" }, { type: "facebook" }],
          },
        },
      ]);

      countTotalLogin.push(loginDateResult.length);
      countLoginSocialArray.push(loginSocialDateResult.length);
    }

    const dateRange = listDate.reverse();
    const userTotalRange = countTotalLogin.reverse();
    const userSocialRange = countLoginSocialArray.reverse();

    var totalLogin = { dateRange, userTotalRange };
    var socialLogin = { dateRange, userSocialRange };

    return res.status(201).json({
      success: true,
      status: 201,
      data: { totalLogin, socialLogin },
      message: "all login date filter found",
    });
  }
};
