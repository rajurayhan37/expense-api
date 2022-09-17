const {
    create,
    getUserByUserEmail,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
    uploadAvatar
  } = require('../services/subscriber.service');
  const bcrypt = require('bcrypt')
  const { hashSync, genSaltSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");
  const remove = require('../helper/unlinker')
  

  module.exports = {
    createUser: (req, res) => {
      const body = req.body;
      getUserByUserEmail(body.email, (err, results) => {
        if(err){
          return res.json({
            success: 0,
            data: 'Internal server error!'
          })
        }
        if(results){
          return res.json({
            success: 0,
            data: 'Email already used!'
          })
        }else{
          
          const salt = genSaltSync(10);
          body.password = hashSync(body.password, salt);
          create(body, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: 0,
                message: "Database connection errror"
              });
            }
            const info = {
              firstName: body.firstName,
              lastName: body.lastName,
              email: body.email,
              phone: body.phone
            }
            const jsontoken = sign({ info}, process.env.JWT_KEY, {
              expiresIn: "1h"
            });
            return res.status(200).json({
              success: 1,
              message: 'Register Successfull',
              data: results,
              token: jsontoken
            });
          });
        }
      })
    },

    login: (req, res) => {
      const body = req.body;
      getUserByUserEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
          return res.json({
            success: 0,
            data: 'Internal server error!'
          })
        }

        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password",
          });
        }
        const result = bcrypt.compare(body.password, results.password);
        if (result) {
          results.password = undefined;
          const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
            expiresIn: "1h"
          });
          return res.json({
            success: 1,
            message: "login successfully",
            token: jsontoken
          });
        } else {
          return res.json({
            success: 0,
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
            success: 0,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
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
          success: 1,
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
          success: 1,
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
            success: 0,
            message: 'Internal server error!'
          });
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "User not found!",
          });
        }
        return res.json({
          success: 1,
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
            success: 0,
            message: 'Internal server error!'
          })
        }

        if(results.affectedRows == 0){
          return res.json({
            success: 0,
            message: 'Internal server error!'
          })
        }

        return res.json({
          success: 1,
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
            success: 0,
            message: "Invalid credintial!"
          });
        }
        image = results.image;
        const isDelete = remove(image, `./uploads`)
        next()
      });
    }
  };

  