const express = require("express");
const {
  createUser,
  loginUser,
  logout,
  getUserDetailsById,
  updateUserProfile,
  updatePassword,
  getAllUsers,
  googleandfblogin,
  getSingleUser,
  deleteUser,
  getLoginUserInfo,
  searchUserDetails,
  registerDateFilter,
  loginDateFilter,
} = require("../controllers/authController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.post("/admin/create", createUser);
router.post("/admin/login", loginUser);
router.post("/admin/googlefblogin", googleandfblogin);
router.get("/admin/logout", isAuthenticatedUser, logout);
router.get("/admin/user", isAuthenticatedUser, getUserDetailsById);
router.put("/admin/user/update", isAuthenticatedUser, updateUserProfile);
router.put("/admin/password/update", isAuthenticatedUser, updatePassword);
router.get("/admin/users", isAuthenticatedUser, getAllUsers);
router.get("/admin/user/:id", isAuthenticatedUser, getSingleUser);
// router.delete("/admin/user/delete/:id", isAuthenticatedUser, deleteUser);
router.get("/admin/users/info", isAuthenticatedUser, getLoginUserInfo);
router.get("/admin/search/:key", isAuthenticatedUser, searchUserDetails);
router.get("/admin/registerDate/filter", isAuthenticatedUser, registerDateFilter);
router.get("/admin/loginDate/filter", isAuthenticatedUser, loginDateFilter);

module.exports = router;
