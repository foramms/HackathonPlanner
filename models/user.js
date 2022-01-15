const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'Sorry, but you need another username']
    },
    password: {
        type: String,
        required: true
    },
    phonenumber:  {
        type: String,
    },
    planners:[
        {type: Schema.Types.ObjectId, ref: 'Planner'}
      ],
    token: String,
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;