require('dotenv').config()
const express = require('express') 
const subscriberRouter = require('./routes/subscriber.route')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/subscriber/', subscriberRouter)

//server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`)
})