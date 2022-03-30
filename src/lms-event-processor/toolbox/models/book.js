const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    book_id: { type: Number },
    book_name: { type: String },
    description: { type: String },
    author_id: { type: Number },
    category_id: { type: Number },
    publisher_id: { type: Number },
    created_by_user_id: { type: Number },
    deleted_by_user_id: { type: Number },
    updated_by_user_id: { type: Number },
    created_at: { type: Date },
    deleted_at: { type: Date },
    updated_at: { type: Date },
    status: { type: Boolean },
    meta: { type: Object }
});

module.exports = mongoose.model("Book", bookSchema);