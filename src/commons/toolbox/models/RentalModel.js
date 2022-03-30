const BaseModel = require('./BaseModel');
const Joi = require('joi');

class RentalModel extends BaseModel {
    constructor() {
        super();
        this.resource = 'rentals';
    }
    static rental_validation(data) {
        try {
            const schema = Joi.object({
                rental_no: Joi.number()
                    .min(1)
                    .required(),
                rental_status: Joi.string()
                    .min(6)
                    .required()
            });
            return schema.validate(data);
        }
        catch (err) {
            console.error(err.message);
        }
    };
};
module.exports = RentalModel;