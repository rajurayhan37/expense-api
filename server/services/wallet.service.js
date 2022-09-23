const pool = require('../config/db.config');

module.exports = {
  createWallet: (data, callBack) => {
    pool.query(
      `INSERT INTO wallets (resource, bank_account, initial_balance, total_expense) 
                values(?,?,?,?)`,
      [
        data.resource,
        data.bankAccount,
        data.initialBalance,
        data.totalExpense
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getWalletById: (id, callBack) => {
    pool.query(
      `SELECT * FROM wallets where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getWallets: callBack => {
    pool.query(
      `SELECT * FROM wallets`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //hiding the password
        results.map(function(result){
          return result.password = undefined
        })
        return callBack(null, results);
      }
    );
  },
  updateWallet: (data, callBack) => {
    pool.query(
      `UPDATE wallets SET resource=?, bank_account=?, initial_balance=?, total_expense=? where id = ?`,
      [
        data.resource,
        data.bankAccount,
        data.initialBalance,
        data.totalExpense,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteWallet: (id, callBack) => {
    pool.query(
      `DELETE FROM wallets WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};