const express = require("express")
const router = express.Router();
const { checkToken, checkActivationToken, checkAuthToken } = require("../auth/validation");
const imageUploader = require('../helper/image.uploader') 
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  uploadAvatar,
  removeOldData,
  updatePassword
} = require("../controller/user.controller");

const {
  dataValidation, 
  emailVerificationSend, 
  resetVerification,
  checkVerificationCode,
  checkEmailRegister,
  loginDataValidation

} = require('../middleware/user.middleware')

//route for register & login
router.post("/register", dataValidation, emailVerificationSend)
router.post("/register/email-verify", checkActivationToken, createUser);
router.post("/login", loginDataValidation, login);
//route for reset password
router.post('/reset-password', checkEmailRegister, resetVerification)
router.post('/verify-otp', checkAuthToken, checkVerificationCode, updatePassword)
router.post('/reset', checkAuthToken, updatePassword)

// router.get("/", checkToken, getUsers);
// router.get("/:id", checkToken, getUserByUserId);
// router.patch("/update/", checkToken, updateUsers);
// router.patch("/upload/:id", checkToken, removeOldData, imageUploader.single('image'), uploadAvatar);
// router.delete("/delete/:id", checkToken, deleteUser);

module.exports = router;