const mongoose = require("mongoose");

const rentalsSchema = new mongoose.Schema({
    book_id: { type: Number },
    user_id: { type: Number },
    rental_no: { type: Number },
    rented_at: { type: Date },
    returned_at: { type: Date },
    requested_at: { type: Date },
    cancelled_at: { type: Date },
    rejected_at: { type: Date },
    status: { type: Boolean },
    rental_status: { type: String },
    meta: { type: Object }
});

module.exports = mongoose.model("Rentals", rentalsSchema);