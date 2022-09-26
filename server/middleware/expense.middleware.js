module.exports = {
    expenseDataValidation: (req, res, next) => {
        const body = req.body
        if(body == undefined){
            return res.json({
                success: false,
                message: "Please enter required information!"
            })
        }else if(body.expenseOrigin == undefined || body.expenseOrigin == ''
            && body.ammount == undefined || body.ammount == ''
            && body.date == undefined || body.date == ''
            && body.time == undefined || body.time == ''
            && body.expenseCategory == undefined || body.expenseCategory == ''
            && body.billing == undefine)
        {
            return res.json({
                success: false,
                message: "Please fillup all required field!"
            })
        }else if(body.expenseOrigin == undefined || body.expenseOrigin == ''){
            return res.json({
                success: false,
                message: "Please enter expense origin!"
            })
        }else if(body.ammount == undefined || body.ammount == ''){
            return res.json({
                success: false,
                message: "Please enter expense ammount!"
            })
        }else if(body.date == undefined || body.date == ''){
            return res.json({
                success: false,
                message: "Please enter date of expense!"
            })
        }else if(body.time == undefined || body.time == ''){
            return res.json({
                success: false,
                message: "Please enter time of expense!"
            })
        }else if(body.expenseCategory == undefined || body.expenseCategory == ''){
            return res.json({
                success: false,
                message: "Please enter expense categorey!"
            })
        }else if(body.billing == undefined ){
            return res.json({
                success: false,
                message: "Please enter billing status!"
            })
        }else{
            next()
        }
    }
}