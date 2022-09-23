const express = require("express")
const router = express.Router();
const { checkToken, checkActivationToken } = require("../auth/validation");
const { dataValidate } = require('../middleware/wallet.middleware')
const {
  createWallet
  
} = require("../controller/wallet.controller");


router.post("/new", dataValidate, createWallet);


module.exports = router;