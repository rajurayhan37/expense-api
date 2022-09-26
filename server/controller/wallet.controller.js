const {
  createWallet,
  getWallets,
  deleteWallet,
  getWalletById,
  updateWallet,
} = require('../services/wallet.service')
  

  module.exports = {
    createWallet: (req, res) => {
        const body = req.body;
        body.id = req.data.data.id
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
    getWallet: (req, res) => {
      getWallets((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.status(200).json({
          success: true,
          data: results
        });
      });
    },
    getWalletById: (req, res) => {
      const id = req.params.id
      getWalletById(id, (err, result) => {
        if(err){
          return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again"
          })
        }
        if(!result){
          return res.status(400).json({
            success: true,
            message: "Record not found!"
          })
        }

        return res.status(200).json({
          success: true,
          message: result
        })
      })
    },
    deleteWallet: (req, res) => {
      const id = req.params.id
      deleteWallet(id, (err, result) => {
        if(err){
          return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again"
          })
        }
        console.log(result)
        if(result.affectedRows > 0){
          return res.status(200).json({
            success: true,
            message: "Wallet successfully deleted!"
          })
        }
        else{
          return res.status(200).json({
            success: true,
            message: "Wallet not found!"
          })
        }
      })
    },
    updateWallet: (req, res) => {
      const body = req.body
      body.id = req.params.id
      updateWallet(body, (err, result) => {
        if(err){
          return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again"
          })
        }
        if(result.affectedRows > 0){
          return res.status(200).json({
            success: true,
            message: "Wallet successfully updated"
          })
        }else{
          return res.status(400).json({
            success: false,
            message: "Wallet not found!"
          })
        }
      })
    }
  };

  