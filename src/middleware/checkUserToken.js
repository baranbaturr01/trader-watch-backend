const isEmpty = require('is-empty');
const JwtService = require('../services/JwtService');
const User = require('../models/User');

module.exports = (req, res, next) => {
    const token = req.header('x-token')

    if (isEmpty(token)) {
        return res.status(400).json({
            message: 'Unauthorized'
        });
    }

    const payload = JwtService.validateToken(token);
    if (!payload) {
        return res.status(400).json({
            message: 'Unauthorized'
        });
    }
    return User.findById(payload.userId).then(user => {
        if (!user) {

            return res.status(400).json({
                message: 'Unauthorized'
            });
        }

        req.user = user;
        next();
    })


}