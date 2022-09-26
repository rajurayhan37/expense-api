const express = require("express")
const router = express.Router();
const { checkAuthToken } = require("../auth/validation");
const imageUploader = require('../helper/image.uploader') 
const { expenseDataValidation } = require('../middleware/expense.middleware')
const {
  createExpense,
  getExpenses,
  deteExpenses,
  updateExpenses,
  getTotalExpense
} = require("../controller/expense.controller");



router.post("/new", checkAuthToken, expenseDataValidation, imageUploader.single('image'), createExpense )
router.get('/all', checkAuthToken, getExpenses)
router.patch('/update/:id', checkAuthToken, updateExpenses)
router.post('/delete/:id', checkAuthToken, deteExpenses)
router.get('/total-expense', checkAuthToken, getTotalExpense)


module.exports = router;