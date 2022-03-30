const BaseModel = require('./BaseModel');
const Joi = require('joi');

class AuthorModel extends BaseModel {
    constructor() {
        super();
        this.resource = 'author';
    }
    static author_validation(data) {
        try {
            const schema = Joi.object({
                author_name: Joi.string()
                    .min(6)
                    .required(),
                description: Joi.string()
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
module.exports = AuthorModel;