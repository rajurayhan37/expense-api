const express = require("express")
const router = express.Router();
const { checkAuthToken } = require("../auth/validation");
const { dataValidate } = require('../middleware/wallet.middleware')
const {
  createWallet,
  getWallet,
  getWalletById,
  deleteWallet,
  updateWallet
  
} = require("../controller/wallet.controller");


router.post("/new", checkAuthToken, dataValidate, createWallet);
router.get('/all',checkAuthToken, getWallet);
router.get('/:id',checkAuthToken, getWalletById)
router.delete('/delete/:id', checkAuthToken, deleteWallet)
router.patch('/update/:id', checkAuthToken, updateWallet)



module.exports = router;