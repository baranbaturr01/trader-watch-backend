const User = require("../../models/User");
const JwtService = require("../../services/JwtService");
const loginValidation = require("../../validation/AuthValidation/loginValidation");

module.exports = async (req, res, next) => {

    const { errors, isValid } = await loginValidation(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;

    return User.findOne({ email: email }).then(user => {

        if (!user) {
            return res.status(400).json({
                message: "User not found!"
            });
        }
        return res.json({
            success: true,
            data: {
                token: JwtService.generateJwt(user),
            }

        });
    });

}
