const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const plannerSchema = new Schema({
    name: {
        type: String,
    },
    tasks:[
        {type: Schema.Types.ObjectId, ref: 'Task'}
      ],
}, {
    timestamps: true
});

const Planner = mongoose.model('Planner', plannerSchema);
module.exports = Planner;