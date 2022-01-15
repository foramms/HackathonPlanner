const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    type:  {
        type: String,
    },
    deadline: { type: Date, default: Date.now},
    priority:  {
        type: Boolean,
    },
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;