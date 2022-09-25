const {
  createWallet,
  getWallets,
  getWalletById,
  updateWallet,
} = require('../services/wallet.service')

const { hashSync, genSaltSync } = require("bcrypt");
  

  module.exports = {
    createWallet: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        createWallet(body, (err, results) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Database connection failed!. Please try again"
            });
          }
          return res.status(200).json({
            success: true,
            message: 'Wallet Successfully added',
        });
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
    getWallet: (req, res) => {
      getWallets((err, results) => {
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

  