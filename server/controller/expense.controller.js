const {
    createExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
    getTotalExpenses
} = require('../services/expense.service')
module.exports = {
    createExpense: (req, res) => {
        const body = req.body
        body.id = req.data.data.id
        createExpense(body, (err, result) => {
            if(err){
                return res.status(500).send("Something went wrong!")
            }
            if(result){
                return res.status(200).json({
                    success: true,
                    message: "Expense successfully added."
                })
            }
            return res.status(304).json({
                success: false,
                message: "Failed to create expense!"
            })
        })
    },

    getExpenses: (req, res) => {
        getExpenses((err, results) => {
            if(err){
                return res.status(500).send("Something went wrong!")
            }
            if(!results){
                return res.status(404).send("Expense record not found!")
            }

            return res.status(200).json({
                success: true,
                data: results
            })
        })
    },

    deteExpenses: (req, res) => {
        const id = req.params.id
        deleteExpense(id, (err, result) => {
            if(err){
                return res.status(500).send("Something went wrong!")
            }
            if(!results){
                return res.status(404).send("Expense record not found!")
            }
            return res.status(200).json({
                success: true,
                message: "Expense successfully deleted!."
            })

        })
    },

    updateExpenses: (req, res) => {
        const body = req.body
        body.id = req.params.id
        updateExpense(body, (err, result) => {
            if(err){
                res.statusCode = 500
                return res.status(500).send("Something went wrong!")
            }
            if(!results){
                res.statusCode = 404
                return res.status(404).send("Expense record not found!")
            }
            res.statusCode = 200
            return res.status(200).send("Expense successfully updated")
        })
    },

    getTotalExpense: (req, res) => {
        const id = req.data.data.id
        getTotalExpenses(id, (err, result) => {
            if(err){
                res.statusCode = 500
                return res.status(500).send("Something went wrong!")
            }
            if(!result){
                res.statusCode = 404
                return res.status(404).send("Expenses not found!")
            }
            res.statusCode = 200
            return res.status(200).json({
                success: true,
                data: result
            })
        })
    }
}