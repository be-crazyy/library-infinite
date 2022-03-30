const UserModel = require('../models/UserModel');

module.exports = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const user = new UserModel();
    const data = await user.find({'user_id': user_id}); 
    if (data[0].role === 'STUDENT') {
      return res.json("Only admins can access and not for normal users.")
    };
    return next();
  }
  catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
