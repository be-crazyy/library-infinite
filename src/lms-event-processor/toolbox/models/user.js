const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_id: { type: Number },
    email: { type: String },
    password: { type: String },
    created_by_user_id: { type: Number },
    deleted_by_user_id: { type: Number },
    updated_by_user_id: { type: Number },
    created_at: { type: Date },
    deleted_at: { type: Date },
    updated_at: { type: Date },
    role: { type: String },
    status: { type: Boolean },
    token: { type: String },
    meta: { type: Object }
});

module.exports = mongoose.model("User", userSchema);