var jwt = require('jsonwebtoken');
const User = require('../models/user');


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader;

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.tokenuser = user;

        User.findOne({ username: user.username }, (error1, realuser) => {
            if (error1) { // If there were any error
                return res.sendStatus(403);
            }
            
            req.objuser = realuser;

            next();

        });
    });

}

module.exports = authenticateToken;