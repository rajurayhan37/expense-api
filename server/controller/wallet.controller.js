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
            res.statusCode = 500
            return res.status(500).send("Something went wrong!");
          }
          res.statusCode = 200
          return res.status(200).send('Wallet Successfully added');
      });
    },
    getWallet: (req, res) => {
      getWallets((err, results) => {
        if (err) {
          res.statusCode = 500
          return res.status(500).send("Something went wrong!");
        }
        res.statusCode = 200
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
          res.statusCode = 500
          return res.status(500).send("Something went wrong! Please try again")
        }
        if(!result){
          res.statusCode = 400
          return res.status(400).send("Record not found!")
        }
        res.statusCode = 200
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
          res.statusCode = 500
          return res.status(500).send("Something went wrong! Please try again")
        }

        if(result.affectedRows > 0){
          res.statusCode = 200
          return res.status(200).send("Wallet successfully deleted!")
        }
        else{
          res.statusCode = 400
          return res.status(404).send("Wallet not found!")
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

  