const BaseModel = require('./BaseModel');
const Joi = require('joi');

class CategoryModel extends BaseModel {
    constructor() {
        super();
        this.resource = 'category';
    }
    static category_validation(data) {
        try {
            const schema = Joi.object({
                category_name: Joi.string()
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
module.exports = CategoryModel;