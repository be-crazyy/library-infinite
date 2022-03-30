const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    author_id: { type: Number },
    author_name: { type: String },
    description: { type: String },
    created_by_user_id: { type: Number },
    deleted_by_user_id: { type: Number },
    updated_by_user_id: { type: Number },
    created_at: { type: Date },
    deleted_at: { type: Date },
    updated_at: { type: Date },
    status: { type: Boolean },
    meta: { type: Object }
});

module.exports = mongoose.model("Author", authorSchema);