const { getUserByUserEmail } = require('../services/user.service')
const nodemailer = require('nodemailer')
const {sign} = require('jsonwebtoken')
const crypto = require('crypto')
const { hashSync, genSaltSync } = require("bcrypt");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const passwordValidation = (password) => {
  var regx= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,12}$/;
  return password.match(regx)
}

module.exports = {
    dataValidation: (req, res, next) => {
      const body = req.body;
      if(body == undefined){
        return res.json({
          success: false,
          message: 'Please provide all information!'
        })
      }
      else if(body.name == undefined || body.name == ''){
        return res.json({
          success: false,
          message: 'Please provide your fullname!',
        })
      }else if(body.email == undefined || body.email == ''){
        return res.json({
          success: false,
          message: 'Please provide your email!',
        })
      }
      else if(!validateEmail(body.email)){
        res.json({
          success: false,
          message: 'Invalid email!. Please enter your valid email.'
        })
      }
      else if(body.password == undefined || body.password == ''){
        return res.json({
          success: false,
          message: 'Please provide your password!',
        })
      }else if(!passwordValidation(body.password)){
        return res.json({
          success: false,
          message: 'Password must be minimum of 8 characters including number,uppper,lowercase letter!'
        })
      }else{
        next()
      }
    },

    emailVerificationSend: (req, res, next) => {
        const body = req.body
        getUserByUserEmail(body.email, (err, results) => {
            if(err){
                res.json({
                    sucsess: false,
                    message: 'Something went wrong!. Please try again'
                })
            }
            
            if(results){
                return res.json({
                  success: false,
                  data: 'This email already used!. Please enter vlaid email.'
                })
              }else{
                //generate random 6 digit verification code
                const verificationCode = (Math.floor(100000 + Math.random() * 900000)).toString()
                body.verificationCode = verificationCode
                const salt = genSaltSync(10);
                body.password = hashSync(body.password, salt);
                const jsontoken = sign({ body }, process.env.JWT_KEY, {
                  expiresIn: '20m'
                });

                let mailTransporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'rajurayhan793@gmail.com',
                        pass: 'bdyacjlsrwteoefv'
                    }
                });
                 
                let mailDetails = {
                    from: 'rajurayhan793@gmail.com',
                    to: body.email,
                    subject: 'Email Verification - Expense',
                    html: `<!DOCTYPE html>
                    <html>
                    <head>
                    
                      <meta charset="utf-8">
                      <meta http-equiv="x-ua-compatible" content="ie=edge">
                      <title>Email Confirmation</title>
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                      <style type="text/css">
                      @media screen {
                        @font-face {
                          font-family: 'Source Sans Pro';
                          font-style: normal;
                          font-weight: 400;
                          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                        }
                        @font-face {
                          font-family: 'Source Sans Pro';
                          font-style: normal;
                          font-weight: 700;
                          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                        }
                      }
                      body,
                      table,
                      td,
                      a {
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%; 
                      }
                      table,
                      td {
                        mso-table-rspace: 0pt;
                        mso-table-lspace: 0pt;
                      }
                    
                      img {
                        -ms-interpolation-mode: bicubic;
                      }
                      a[x-apple-data-detectors] {
                        font-family: inherit !important;
                        font-size: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                        color: inherit !important;
                        text-decoration: none !important;
                      }
                    
                      div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                      }
                      body {
                        width: 100% !important;
                        height: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                      }
                      table {
                        border-collapse: collapse !important;
                      }
                      a {
                        color: #1a82e2;
                      }
                      img {
                        height: auto;
                        line-height: 100%;
                        text-decoration: none;
                        border: 0;
                        outline: none;
                      }
                      </style>
                    
                    </head>
                    <body style="background-color: #e9ecef;">
                    
                      <!-- start preheader -->
                      <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
                        A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
                      </div>
                      <!-- end preheader -->
                    
                      <!-- start body -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    
                        <!-- start logo -->
                        <tr>
                          <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                <td align="center" valign="top" style="padding: 36px 24px;">
                                  <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                                    <img src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <!-- end logo -->
                    
                        <!-- start hero -->
                        <tr>
                          <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <!-- end hero -->
                    
                        <!-- start copy block -->
                        <tr>
                          <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    
                              <!-- start copy -->
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                  <p style="margin: 0;">Please confirm within <b style="color: rgb(226, 70, 70);">10 minutes</b> after that this code is expired!. If you didn't create an account with <b>Expense</b>, you can safely delete this email.</p>
                                </td>
                              </tr>
                              <!-- end copy -->
                             
                              <!-- start button -->
                              <tr>
                                <td align="center" bgcolor="#ffffff">
                                  <div>
                                    
                                    <a  style=" background-color: #1a82e2; padding: 10px 15px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 20px; color: #ffffff; text-decoration: none; border-radius: 6px;">${verificationCode[0]}</a>
                                    <a  style=" background-color: #1a82e2; padding: 10px 15px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 20px; color: #ffffff; text-decoration: none; border-radius: 6px;">${verificationCode[1]}</a>
                                    <a  style=" background-color: #1a82e2; padding: 10px 15px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 20px; color: #ffffff; text-decoration: none; border-radius: 6px;">${verificationCode[2]}</a>
                                    <a  style=" background-color: #1a82e2; padding: 10px 15px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 20px; color: #ffffff; text-decoration: none; border-radius: 6px;">${verificationCode[3]}</a>
                                    <a  style=" background-color: #1a82e2; padding: 10px 15px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 20px; color: #ffffff; text-decoration: none; border-radius: 6px;">${verificationCode[4]}</a>
                                    <a  style=" background-color: #1a82e2; padding: 10px 15px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 20px; color: #ffffff; text-decoration: none; border-radius: 6px;">${verificationCode[5]}</a>
                                  </div>
                                </td>
                              </tr>
                              <!-- end button -->
                    
                              <!-- start copy -->
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                  <p style="margin: 0;">If that doesn't work, please try again or <b style="color: #1a82e2;">contact with us</b>:</p>
                                  <p style="margin: 0;"><a href="https://expense.com/contact" target="_blank">https://expense.com/contact</a></p>
                                </td>
                              </tr>
                              <!-- end copy -->
                    
                              <!-- end copy -->
                    
                            </table>
                          </td>
                        </tr>
                        <!-- end copy block -->
                      <!-- end body -->
                    
                    </body>
                    </html>`
                };
                 
                mailTransporter.sendMail(mailDetails, function(err, data) {
                    if(err) {
                        console.log('Error Occurs', err);
                        return res.json({
                            success: false,
                            message: 'Registration failed!',
                            token: jsontoken
                        })
                    } else {
                        return res.json({
                            success: true,
                            message: 'Verification code sent to your email.',
                            token: jsontoken
                        })
                    }
                });
              }
        })
    },

    resetVerification: (req, res, next) => {
      const body = req.body
        getUserByUserEmail(body.email, (err, results) => {
            if(err){
                res.json({
                    sucsess: false,
                    message: "Didn't matche with your email!"
                })
            }
            
            if(results){
                
              
                //generate random 6 digit verification code
                const verificationCode = (Math.floor(1000 + Math.random() * 9000)).toString()
                body.verificationCode = verificationCode
                
                const jsontoken = sign({ body }, process.env.JWT_KEY, {
                  expiresIn: '20m'
                });

                let mailTransporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'rajurayhan793@gmail.com',
                        pass: 'bdyacjlsrwteoefv'
                    }
                });
                 
                let mailDetails = {
                    from: 'rajurayhan793@gmail.com',
                    to: body.email,
                    subject: 'Reset Password - Expense',
                    html: `<!DOCTYPE html>
                    <html>
                    <head>
                    
                      <meta charset="utf-8">
                      <meta http-equiv="x-ua-compatible" content="ie=edge">
                      <title>Email Confirmation</title>
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                      <style type="text/css">
                      @media screen {
                        @font-face {
                          font-family: 'Source Sans Pro';
                          font-style: normal;
                          font-weight: 400;
                          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                        }
                        @font-face {
                          font-family: 'Source Sans Pro';
                          font-style: normal;
                          font-weight: 700;
                          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                        }
                      }
                      body,
                      table,
                      td,
                      a {
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%; 
                      }
                      table,
                      td {
                        mso-table-rspace: 0pt;
                        mso-table-lspace: 0pt;
                      }
                    
                      img {
                        -ms-interpolation-mode: bicubic;
                      }
                      a[x-apple-data-detectors] {
                        font-family: inherit !important;
                        font-size: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                        color: inherit !important;
                        text-decoration: none !important;
                      }
                    
                      div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                      }
                      body {
                        width: 100% !important;
                        height: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                      }
                      table {
                        border-collapse: collapse !important;
                      }
                      a {
                        color: #1a82e2;
                      }
                      img {
                        height: auto;
                        line-height: 100%;
                        text-decoration: none;
                        border: 0;
                        outline: none;
                      }
                      </style>
                    
                    </head>
                    <body style="background-color: #e9ecef;">
                    
                      <!-- start preheader -->
                      <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
                        Your password rest verification code is ${verificationCode}.
                      </div>
                      <!-- end preheader -->
                    
                      <!-- start body -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    
                        <!-- start logo -->
                        <tr>
                          <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                <td align="center" valign="top" style="padding: 36px 24px;">
                                  <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                                    <img src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <!-- end logo -->
                    
                        <!-- start hero -->
                        <tr>
                          <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <!-- end hero -->
                    
                        <!-- start copy block -->
                        <tr>
                          <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    
                              <!-- start copy -->
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                  <p style="margin: 0;">Please reset within <b style="color: rgb(226, 70, 70);">10 minutes</b> after that this code is expired!. If you didn't create an account with <b>Expense</b>, you can safely delete this email.</p>
                                </td>
                              </tr>
                              <!-- end copy -->
                             
                              <!-- start button -->
                              <tr>
                                <td align="center" bgcolor="#ffffff">
                                  <div>
                                    
                                    <a  style=" background-color: #1a82e2; padding: 10px 15px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 20px; color: #ffffff; text-decoration: none; border-radius: 6px;">${verificationCode[0]}</a>
                                    <a  style=" background-color: #1a82e2; padding: 10px 15px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 20px; color: #ffffff; text-decoration: none; border-radius: 6px;">${verificationCode[1]}</a>
                                    <a  style=" background-color: #1a82e2; padding: 10px 15px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 20px; color: #ffffff; text-decoration: none; border-radius: 6px;">${verificationCode[2]}</a>
                                    <a  style=" background-color: #1a82e2; padding: 10px 15px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 20px; color: #ffffff; text-decoration: none; border-radius: 6px;">${verificationCode[3]}</a>
                                  </div>
                                </td>
                              </tr>
                              <!-- end button -->
                    
                              <!-- start copy -->
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                  <p style="margin: 0;">If that doesn't work, please try again or <b style="color: #1a82e2;">contact with us</b>:</p>
                                  <p style="margin: 0;"><a href="https://expense.com/contact" target="_blank">https://expense.com/contact</a></p>
                                </td>
                              </tr>
                              <!-- end copy -->
                    
                              <!-- end copy -->
                    
                            </table>
                          </td>
                        </tr>
                        <!-- end copy block -->
                      <!-- end body -->
                    
                    </body>
                    </html>`
                };
                 
                mailTransporter.sendMail(mailDetails, function(err, data) {
                    if(err) {
                        console.log('Error Occurs', err);
                        return res.json({
                            success: false,
                            message: 'Registration failed!',
                            token: jsontoken
                        })
                    } else {
                        return res.json({
                            success: true,
                            message: 'Verification code sent to your email.',
                            token: jsontoken
                        })
                    }
                });
              }
        })
    }
}