module.exports = {
    expenseDataValidation: (req, res, next) => {
        const body = req.body
        if(body == undefined){
            res.statusCode = 404
            res.status(404).send("Please enter required information!")
            
        }else if(body.expenseOrigin == undefined || body.expenseOrigin == ''
            && body.ammount == undefined || body.ammount == ''
            && body.date == undefined || body.date == ''
            && body.time == undefined || body.time == ''
            && body.expenseCategory == undefined || body.expenseCategory == ''
            && body.billing == undefine)
        {
            return res.status(404).send("Please fillup all required field!")
        }else if(body.expenseOrigin == undefined || body.expenseOrigin == ''){
            res.statusCode = 404
            return res.status(404).send("Please enter expense origin!")
            
        }else if(body.ammount == undefined || body.ammount == ''){
            res.statusCode = 404
            return res.status(404).send("Please enter expense ammount!")
            
        }else if(body.date == undefined || body.date == ''){
            res.statusCode = 404
            return res.status(404).send("Please enter date of expense!")
            
        }else if(body.time == undefined || body.time == ''){
            res.statusCode = 404
            return res.status(404).send("Please enter time of expense!")
            
        }else if(body.expenseCategory == undefined || body.expenseCategory == ''){
            res.statusCode = 404
            return res.status(404).send("Please enter expense categorey!")
           
        }else if(body.billing == undefined ){
            res.statusCode = 404
            return res.status(404).send("Please enter billing status!")
            
        }else{
            next()
        }
    }
}