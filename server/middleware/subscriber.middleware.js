const { getUserByUserEmail } = require('../services/subscriber.service')
const nodemailer = require('nodemailer')
const {sign} = require('jsonwebtoken')
const crypto = require('crypto')

module.exports = {
    emailVerificationSend: (req, res, next) => {
        const body = req.body
        getUserByUserEmail(body.email, (err, results) => {
            if(err){
                res.json({
                    sucsess: 0,
                    message: 'Internal server error!'
                })
            }
            
            if(results){
                return res.json({
                  success: 0,
                  data: 'Email already used!'
                })
              }else{

                const verificationCode = (Math.floor(100000 + Math.random() * 900000)).toString()
                console.log(typeof(verificationCode), verificationCode)
                const jsontoken = sign({ verificationCode }, process.env.JWT_KEY, {
                  expiresIn: '10m'
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
                            success: 0,
                            message: 'Registration failed!'
                        })
                    } else {
                        return res.json({
                            success: 1,
                            message: 'Verification code sent to your email.',
                            token: jsontoken,
                            data: body
                        })
                    }
                });
              }
        })
    }
}