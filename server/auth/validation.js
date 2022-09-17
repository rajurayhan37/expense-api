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
          return res.json({
            success: 0,
            message: "Token is expired!"
          });
        } else {
          req.body = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User"
      });
    }
  },
  checkActivationToken: (req, res, next) => {
    let token = req.body.token;
    if (token) {
      // Remove Bearer from string
      token = token.slice(process.env.JWT_KEY.length);
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Expire your confirmation code!"
          });
        } else {
          req.decoded = decoded;
          console.log(jwt.decode(token))
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Invalid your confirmation code!"
      });
    }
  },
};