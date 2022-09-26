const {
    createExpense,
    getExpenses,
    deleteExpense,
    updateExpense
} = require('../services/expense.service')
module.exports = {
    createExpense: (req, res) => {
        const body = req.body
        body.id = req.data.data.id
        createExpense(body, (err, result) => {
            if(err){
                return res.status(500).json({
                    success: false,
                    message: "Something wrong! Try again."
                })
            }
            if(result){
                return res.json({
                    success: false,
                    message: "Expense successfully added."
                })
            }
            return res.json({
                success: true,
                message: "Failed to create expense!"
            })
        })
    },

    getExpenses: (req, res) => {
        getExpenses((err, results) => {
            if(err){
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong! Please try again"
                })
            }
            if(results){
                return res.status(200).json({
                    success: true,
                    data: results
                })
            }
        })
    },

    deteExpenses: (req, res) => {
        const id = req.params.id
        deleteExpense(id, (err, result) => {
            if(err){
                return res.json({
                    success: false,
                    message: "Something went wrong! Please try again"
                })
            }
            if(results.affectedRows == false){
                return res.json({
                    success: false,
                    message: "Something went wrong! Please try again."
                })
            }
            return res.json({
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
                return res.json({
                    success: false,
                    message: "Something went wrong! Please try again"
                })
            }
            if(results.affectedRows == false){
                return res.json({
                    success: false,
                    message: "Something went wrong! Please try again."
                })
            }
            return res.json({
                success: true,
                message: "Expense successfully updated."
            })
        })
    }
}