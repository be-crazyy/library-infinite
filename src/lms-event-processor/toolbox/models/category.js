const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category_id: { type: Number },
    category_name: { type: String },
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

module.exports = mongoose.model("Category", categorySchema);