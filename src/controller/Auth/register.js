const bcrypt = require('bcrypt');
const userModel = require('../../models/User');
const jwtService = require('../../services/JwtService');
const registerValidation = require('../../validation/AuthValidation/registerValidation');
const User = require('../../models/User');

module.exports = (req, res, next) => {

    const { errors, isValid } = registerValidation(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    return User.findOne({ email: email }).then(user => {
        if (user) {
            return res.status(400).json({
                message: 'User already exists!'
            });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        return newUser.save().then(user => {

            if (!user) {
                return res.status(500).json({
                    message: 'User not created!'
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    token: jwtService.generateJwt(user),
                    message: 'User created!',
                }

            }).catch(err => {
                return res.status(500).json({
                    message: 'User not created!'
                });
            })
        })

    });


}