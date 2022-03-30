const jwt = require("jsonwebtoken");
const config = require('../../config');
module.exports = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    const decoded = jwt.verify(token, config.JWT_TOKEN_SECRET);
    req.user = decoded;
    return next();
  }
  catch (err) {
    return res.status(401).send("Invalid Token");
  }
};
