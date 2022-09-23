const express = require("express")
const router = express.Router();
const { checkToken, checkActivationToken } = require("../auth/validation");
const imageUploader = require('../helper/image.uploader') 
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  uploadAvatar,
  removeOldData
} = require("../controller/user.controller");

const {
  dataValidation, 
  emailVerificationSend, 
  resetVerification
} = require('../middleware/user.middleware')


router.get("/", checkToken, getUsers);
router.post("/signup", dataValidation, emailVerificationSend)
router.post("/verify-otp", checkActivationToken, createUser);
router.post("/login", login);
router.post('/reset', resetVerification)
router.get("/:id", checkToken, getUserByUserId);
router.patch("/update/", checkToken, updateUsers);
router.patch("/upload/:id", checkToken, removeOldData, imageUploader.single('image'), uploadAvatar);
router.delete("/delete/:id", checkToken, deleteUser);

module.exports = router;