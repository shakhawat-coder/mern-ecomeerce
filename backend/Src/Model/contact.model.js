const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: false
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("contact", contactSchema);  
