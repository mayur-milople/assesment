const express = require("express");
const {
  createUser,
  loginUser,
  logout,
  getUserDetailsById,
  updateUserProfile,
  updatePassword,
  getAllUsers,
  googleandfblogin
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

module.exports = router;
