const BaseModel = require('./BaseModel');
const Joi = require('joi');

class UserModel extends BaseModel {
  constructor() {
    super();
    this.resource = 'my_user';
  }
  static user_validation(data) {
    try {
      const schema = Joi.object({
        email: Joi.string()
          .min(4)
          .required()
          .email(),
        password: Joi.string()
          .min(4)
          .required()
      });
      return schema.validate(data);
    }
    catch (err) {
      console.error(err.message);
    }
  };
};
module.exports = UserModel;