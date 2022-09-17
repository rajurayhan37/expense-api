const express = require("express")
const router = express.Router();
const { checkToken } = require("../auth/validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  uploadAvatar,
  removeOldData
} = require("../controller/subscriber.controller");
const imageUploader = require('../helper/image.uploader') 
const {emailVerificationSend} = require('../middleware/subscriber.middleware')


router.get("/", checkToken, getUsers);
router.post("/signup", emailVerificationSend)
router.post("/create", checkToken, createUser);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/update/", checkToken, updateUsers);
router.patch("/upload/:id", checkToken, removeOldData, imageUploader.single('image'), uploadAvatar);
router.delete("/delete/:id", checkToken, deleteUser);

module.exports = router;