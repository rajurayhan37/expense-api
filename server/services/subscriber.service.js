const pool = require('../config/db.config');

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO subscriber(firstName, lastName, email, password, phone) 
                values(?,?,?,?,?)`,
      [
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.phone
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM subscriber WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `SELECT * FROM subscriber where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: callBack => {
    pool.query(
      `SELECT * FROM subscriber`,
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
  updateUser: (data, callBack) => {
    pool.query(
      `UPDATE subscriber SET firstName=?, lastName=?, email=?, number=? where id = ?`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.number,
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
  deleteUser: (id, callBack) => {
    pool.query(
      `DELETE FROM subscriber WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  uploadAvatar: (data, callBack) => {
    pool.query(
      `UPDATE subscriber SET image = ? WHERE id = ?`,
      [
        data.image,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};