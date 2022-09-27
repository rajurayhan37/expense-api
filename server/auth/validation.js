const jwt = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    req.data = req.body
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(process.env.JWT_KEY.length);
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          res.statusCode = 498 
          return res.status(401).send("Invalid token!")
        } else {
          req.body = decoded;
          next();
        }
      });
    } else {
      res.statusCode = 401
      return res.status(401).send("Access Denied! Unauthorized User!")
      
    }
  },

  checkAuthToken: (req, res, next) => {
    req.data = req.body
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(process.env.JWT_KEY.length);
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          res.statusCode = 498 
          return res.status(401).send("Invalid token!")
        } else {
          req.data = decoded;
          next();
        }
      });
    } else {
      res.statusCode = 401
      return res.status(401).send("Access Denied! Unauthorized User!")
    }
  },

  checkActivationToken: (req, res, next) => {
    let token = req.get("authorization");
    
    if (token) {
      // Remove Bearer from string
      token = token.slice(process.env.JWT_KEY.length);
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          res.statusCode = 498 
          return res.status(401).send("Invalid token!")
        } else {
          req.data = decoded;
          next();
        }
      });
    } else {
      res.statusCode = 401
      return res.status(401).send("Access Denied! Unauthorized User!")
    }
  },
};