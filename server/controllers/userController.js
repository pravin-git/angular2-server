var jwt = require('jsonwebtoken');
var User = require('../models/user.js');

module.exports.getAllUsers = function (req, res) {
    var query = User.find({}).select({ "username": 1, "_id": 2 });

    query.exec(function (err, users) {
        if (err) {
            return res.status(500).send("error in getting all users");
        }

        var projectedData = users.map(function (u) {
            return {
                display: u.username,
                value: u._id,
            }
        });

        return res.json({ data: projectedData });
    })
}

module.exports.addUser = function (req, res) {
    var newUser = new User(req.body);
    newUser.save(function (err) {
        if (err) {
            return res.status(500).send("error in saving user");
        }
        return res.status(200).json({ data: true, message: 'user registered' });

    });
}

module.exports.authenticate = function (req, res) {
    User.find({ username: req.body.username, password: req.body.password }, function (err, users) {
        if (err) {
            return res.status(500).json({ data: false, message: 'Invalid Username and password' });
        } else {
            if (users.length === 1) {
                var token = jwt.sign({ username: req.body.username, email: req.body.email }, process.env.SECRET_KEY, { expiresIn: 5000 });
                return res.json({
                    data: true,
                    token: token,
                    usercontext: users[0]
                });
            } else {
                return res.status(200).json({ data: false, message: 'Invalid Username and password' });
            }
        }
    });
}