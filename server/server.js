require('dotenv').config()
const express = require('express') 
const userRouter = require('./routes/user.route')
const walletRouter = require('./routes/wallet.route')
const expenseRouter = require('./routes/expense.route')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/user/', userRouter)
app.use('/api/wallet/', walletRouter)
app.use('/api/expense/', expenseRouter)

//server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`)
})