
module.exports = {
    dataValidate: (req, res, next) => {
      const body = req.body;
      body.totalExpense = 0.00;
      body.balance = body.initialBalance
      
      if(body == undefined){
        return res.json({
          success: false,
          message: 'Please provdie all information!'
        });
      }
      else if (body.resource == undefined || body.resource == ''){
          return res.json({
            success: false,
            message: 'Please enter the resource!'
          })
      }else if (body.bankAccount == undefined || body.bankAccount == '' ){
          return res.json({
            success: false,
            message: 'Please enter your bank account!'
          })
      }else if (body.initialBalance == undefined ||body.initialBalance == ''){
          return res.json({
            success: false,
            message: 'Please enter your initial balance!'
          })
      }
      else{
        next();
      }
    }
}