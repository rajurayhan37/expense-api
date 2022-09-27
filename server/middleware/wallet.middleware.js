
module.exports = {
    dataValidate: (req, res, next) => {
      const body = req.body;
      body.totalExpense = 0.00;
      body.balance = body.initialBalance
      
      if(body == undefined){
        res.statusCode = 404
        return res.status(404).send("Please provdie all information!")
        
      }
      else if (body.resource == undefined || body.resource == ''){
        res.statusCode = 404
        return res.status(404).send("Please enter the resource!")  
        
      }else if (body.bankAccount == undefined || body.bankAccount == '' ){
        res.statusCode = 404
        return res.status(404).send("Please enter your bank account!")    
       
      }else if (body.initialBalance == undefined ||body.initialBalance == ''){
        res.statusCode = 404
        return res.status(404).send("Please enter your initial balance!")
       
      }
      else{
        next();
      }
    }
}