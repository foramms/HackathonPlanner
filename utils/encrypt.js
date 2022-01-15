var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.cryptPassword = (pass, callback) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return callback(err);

        bcrypt.hash(pass, salt, function (err, hash) {
            return callback(err, hash);
        });
    })
};

exports.comparePassword = function (plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
        return err == null ?
            callback(null, isPasswordMatch) :
            callback(err);
    });
};
