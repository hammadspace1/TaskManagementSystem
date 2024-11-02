const mongoose = require("mongoose");

const ManagerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

const Manager = mongoose.model("Manager", ManagerSchema);
module.exports = Manager;
