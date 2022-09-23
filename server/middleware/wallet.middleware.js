const { getUserByUserEmail } = require('../services/user.service')
const nodemailer = require('nodemailer')
const {sign} = require('jsonwebtoken')
const crypto = require('crypto')

module.exports = {
    dataValidate: (req, res, next) => {
      const body = req.body;
      if(body == undefined){
        return res.json({
          success: false,
          message: 'Please provdie all information!'
        });
      }
      else if (body.resource == undefined || body.resource == '' || 
        body.bankAccount == undefined || body.bankAccount == '' || 
        body.initialBalance == undefined ||body.initialBalance == ''){
          return res.json({
            success: false,
            message: 'Please provide required information!'
          })
      }
      else{
        next();
      }
    }
}