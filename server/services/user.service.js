const pool = require('../config/db.config');

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO users(name, email, password) 
                values(?,?,?)`,
      [
        data.name,
        data.email,
        data.password,
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
      `SELECT * FROM users WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updatePassword: (data, callBack) => {
    try{
      pool.query(
        `UPDATE users SET password=? where email = ?`,
        [
          data.password,
          data.email
        ],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    }catch(err){

    }
  },

  getUserByUserId: (id, callBack) => {
    pool.query(
      `SELECT * FROM users where id = ?`,
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
      `SELECT * FROM users`,
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
      `UPDATE users SET firstName=?, lastName=?, email=?, number=? where id = ?`,
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
      `DELETE FROM users WHERE id = ?`,
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
      `UPDATE users SET image = ? WHERE id = ?`,
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