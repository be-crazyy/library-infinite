const BaseModel = require('./BaseModel');
const Joi = require('joi');

class PublisherModel extends BaseModel {
    constructor() {
        super();
        this.resource = 'publisher';
    }
    static publisher_validation(data) {
        try {
            const schema = Joi.object({
                publisher_name: Joi.string()
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
module.exports = PublisherModel;