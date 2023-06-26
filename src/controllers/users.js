const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// sign up user
module.exports.signUp = (req, res, next) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    User.find( {$or:[{username: username}, {email: email}]})
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    msg: 'User Exists',
                })
            } else {
                bcrypt.hash(password, 12, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        })
                    } else {
                        const user = new User({
                            username: username,
                            email: email,
                            password: hash,
                        })
                        user.save()
                            .then(result => {
                                console.log(result)
                                res.status(200).json({
                                    msg: 'User Created!'
                                })
                            }).catch(err => {
                                res.status(500).json({
                                    error: err,
                                })
                            })
                    }
                })
            }
        })
}


module.exports.login = (req, res, next) => {
    User.find({ $or:[ {username: req.body.username}, {email: req.body.email} ] })
        .then(user => {
            if ( user.length < 1) {
                return res.status(401).json({
                    msg: 'Auth Faild!'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        msg: 'Auth Faild!'
                    })
                } else if(result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 'secret', { expiresIn: '1h' })
                    return res.status(200).json({
                        msg: 'Login successful!',
                        token: token
                    })
                } else {
                    return res.status(401).json({
                        msg: 'Auth Faild!'
                    })
                }
            })
        })
}