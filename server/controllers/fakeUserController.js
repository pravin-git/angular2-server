var jwt = require('jsonwebtoken');

module.exports.signIn = function (req, res) {
    console.log(req.body);

    if (req.body.username === 'pravin' && req.body.password === 'pass123') {
        var token = jwt.sign({
            username: req.body.username,
            password: req.body.password
        }, process.env.SECRET_KEY, {expiresIn : 60 * 60 * 24 }); // expires in 24 hours
        return res.json({
            token:token,
            user : req.body.username
        })
    }
    else {
        return res.status(404).json({ data: false, message: 'Invalid Username and password' });
    }
}