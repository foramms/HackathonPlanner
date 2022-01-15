const User = require('../models/user');
const Planner = require('../models/planner');
const Task = require('../models/task');

const encrypt = require('../utils/encrypt');
var jwt = require('jsonwebtoken');


/**
 * Sign In
 * @param {*} req 
 * @param {*} res 
 */
const signin = async (req, res) => {
    const data = req.body;

    encrypt.cryptPassword(data.password, async (err, hash) => { // CRYPT the password
        if (err) { // If there was an error we return an error
            res.status(400).json({ state: "error", messageError: "An unexpected error has occurred" });
            return console.log(err);
        }

        data.password = hash; // change the password

        
        try {
            const task = new Task({
                title: "Add a new task",
                description: "Please add some extra information",
            });

            await task.save();

            const planner = new Planner({
                name: "Name's Planner",
                tasks: [
                    task,
                ],
            });

            await planner.save();

            data.planners = [ planner ];
            const user = new User(data);

            const tokenUser = { username: user.username };

            user.token = jwt.sign(tokenUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' }); // We create the password token

            user.save().then((newuser) => {
                res.status(201).json({ username: newuser.username, token: newuser.token });
                console.log("New User Created!");
            }).catch((error) => {
                res.status(400).json({ state: "error", messageError: `There has been an error with the code`, code: error.code, });
                console.log(error);
            });

        } catch(err) {
            res.status(400).json({ state: "error", messageError: `There has been an error with the code`, });
            console.log(err);
        }

    });
};

const login = (req, res) => {
    const data = req.body;

    User.findOne({ username: data.username }, (err, user) => {
        if (err) { // If there were any error
            res.status(400).json({ messageError: "An unexpected error has occurred" });
            return console.log(err);
        }

        // Check if the user exist
        if (!user) return res.status(200).json({ state: "error", messageError: "The user dosen't exist", field: "username" });

        // We have to compare the password
        encrypt.comparePassword(data.password, user.password, (error, isPassword) => {
            if (error || !isPassword) {
                res.status(200).json({ state: "error", messageError: "The username or password are incorrected", field: "username" });
                return console.log(error);
            }

            const tokenUser = { username: user.username };
            user.token = jwt.sign(tokenUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });

            user.save((erro) => {
                if (erro) {
                    res.status(400).json({ state: "error", messageError: "An unexpected error has occurred" });
                    return console.log(err);
                }

                res.status(201).json({ state: "ok", username: user.username, token: user.token });
            });
        });
    });
}

module.exports = {
    signin,
    login
};