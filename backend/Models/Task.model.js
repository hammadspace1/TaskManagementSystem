const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    taskFor: {
        type: String,
        required: true
    },
    taskStatus: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    date: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;