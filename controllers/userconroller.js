const User = require('../models/user');
const encrypt = require('../utils/encrypt');
var jwt = require('jsonwebtoken');


/**
 * Sign In
 * @param {*} req 
 * @param {*} res 
 */
const signin = (req, res) => {
    const data = req.body;

    encrypt.cryptPassword(data.password, (err, hash) => { // CRYPT the password
        if (err) { // If there was an error we return an error
            res.status(400).json({ state: "error", messageError: "An unexpected error has occurred" });
            return console.log(err);
        }

        data.password = hash; // change the password

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
    });
};

module.exports = {
    signin
};