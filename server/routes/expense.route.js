const express = require("express")
const router = express.Router();
const { checkToken } = require("../auth/validation");
const imageUploader = require('../helper/image.uploader') 
const { expenseDataValidation } = require('../middleware/expense.middleware')
const {
  createExpense,
  deteExpenses,
  updateExpenses
} = require("../controller/expense.controller");



router.post("/new", checkToken, expenseDataValidation, imageUploader.single('image'), createExpense )
router.patch('/update/:id', checkToken, updateExpenses)
router.post('/delete/:id', checkToken, deteExpenses)


module.exports = router;