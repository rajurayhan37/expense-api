const {
    createExpense,
    deleteExpense,
    updateExpense
} = require('../services/expense.service')
module.exports = {
    createExpense: (req, res) => {
        const body = re.body
        body.image = req.file.filename
        createExpense(body, (err, result) => {
            if(err){
                return res.statusCode(500).json({
                    success: false,
                    message: "Something wrong! Try again."
                })
            }
            if(results.affectedRows == false){
                return res.json({
                    success: false,
                    message: "Something wrong! Please try again."
                })
            }
            return res.json({
                success: true,
                message: "Expense successfully added."
            })
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