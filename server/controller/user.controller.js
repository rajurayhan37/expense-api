const {
    create,
    getUserByUserEmail,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
    uploadAvatar
  } = require('../services/user.service');
  const bcrypt = require('bcrypt')
  const { hashSync, genSaltSync } = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const remove = require('../helper/unlinker')
  

  module.exports = {
    createUser: (req, res) => {
      const body = req.data.body;
      if(req.body.code == body.verificationCode){
        create(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: "Database connection errror"
            });
          }

          const info = {
            name: body.name,
            email: body.email,
          }

          const jsontoken = jwt.sign({ info}, process.env.JWT_KEY, {
            expiresIn: "1h"
          });

          return res.status(200).json({
            success: true,
            message: 'Register Successfull',
            data: results,
            token: jsontoken
          });
        })
      }else{
        return res.json({
          success: false,
          message: 'Invalid confirmation code please check your email!'
        })
      }
      
    },

    login: (req, res) => {
      const body = req.body;
      getUserByUserEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            data: 'Internal server error!'
          })
        }

        if (!results) {
          return res.json({
            success: false,
            data: "Invalid email or password",
          });
        }
        const result = bcrypt.compare(body.password, results.password);
        if (result) {
          results.password = undefined;
          const jsontoken = jwt.sign({ result: results }, process.env.JWT_KEY, {
            expiresIn: "1h"
          });
          return res.json({
            success: true,
            message: "login successfully",
            token: jsontoken
          });
        } else {
          return res.json({
            success: false,
            data: "Invalid email or password",
            email: body.email,
            pass: body.password
          });
        }
      });
    },
    getUserByUserId: (req, res) => {
      const id = req.params.id;
      getUserByUserId(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: false,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: true,
          data: results
        });
      });
    },
    getUsers: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: true,
          data: results
        });
      });
    },
    updateUsers: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      updateUser(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: true,
          message: "Updated successfully"
        });
      });
    },
    deleteUser: (req, res) => {
      const data = req.params.id;
      deleteUser(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: 'Internal server error!'
          });
        }
        if (!results) {
          return res.json({
            success: false,
            message: "User not found!",
          });
        }
        return res.json({
          success: true,
          message: "User deleted successfully"
        });
      });
    },

    uploadAvatar: (req, res) => {
      const body = {
        id: req.params.id,
        image: req.file.filename
      }
      uploadAvatar(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: 'Internal server error!'
          })
        }

        if(results.affectedRows == false){
          return res.json({
            success: false,
            message: 'Internal server error!'
          })
        }

        return res.json({
          success: true,
          message: "Avatar successfully updated"
        });
      });
    },

    removeOldData: (req, res, next) => {
      const id = req.params.id
      getUserByUserId(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: false,
            message: "Invalid credintial!"
          });
        }
        image = results.image;
        const isDelete = remove(image, `./uploads`)
        next()
      });
    }
  };

  