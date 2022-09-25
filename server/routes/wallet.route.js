const express = require("express")
const router = express.Router();
const { checkToken } = require("../auth/validation");
const { dataValidate } = require('../middleware/wallet.middleware')
const {
  createWallet,
  getWallet
  
} = require("../controller/wallet.controller");


router.post("/new", dataValidate, createWallet);
router.get('/all', getWallet);


module.exports = router;