const BaseModel = require('./BaseModel');
const Joi = require('joi');

class BookModel extends BaseModel {
    constructor() {
        super();
        this.resource = 'book';
    }
    static queueName = 'book.queue';
    static book_validation(data) {
        try {
            const schema = Joi.object({
                book_name: Joi.string()
                    .min(1),
                description: Joi.string()
                    .min(1),
                author_id: Joi.number()
                    .min(1),
                category_id: Joi.number()
                    .min(1),
                publisher_id: Joi.number()
                    .min(1)
            });
            return schema.validate(data);
        }
        catch (err) {
            console.error(err.message);
        }
    };
    
};
module.exports = BookModel;