const pool = require('../config/db.config');

module.exports = {
  createExpense: (data, callBack) => {
    pool.query(
      `INSERT INTO expenses (expense_origin, ammount, date, time, expense_category, image, billing, user_id) 
                values(?,?,?,?,?,?,?,?)`,
      [
        data.expenseOrigin,
        data.ammount,
        data.date,
        data.time,
        data.expenseCategory,
        data.image,
        data.billing,
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

  getExpenses: callBack => {
    pool.query(
      `SELECT * FROM expenses`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteExpense: (id, callBack) => {
    pool.query(
      `DELETE FROM expenses WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  

  updateExpense: (data, callBack) => {
    pool.query(
      `UPDATE expenses SET expense_origin=?, ammount=?, date=?, time=?, expense_category=?, image=?, billing=? where id = ?`,
      [
        data.expenseOrigin,
        data.ammount,
        data.date,
        data.time,
        data.expenseCategory,
        data.image,
        data.billing,
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

  getTotalExpenses: (id, callBack) => {
    pool.query(
      `SELECT SUM(expenses.ammount) as total_expenses FROM users, expenses WHERE users.id = expenses.user_id AND users.id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }

}