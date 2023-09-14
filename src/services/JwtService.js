const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {

    generateJwt: (user) => {
        const token = jwt.sign({
            email: user.email,
            userId: user._id
        },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
        );
        return token;
    },

    validateToken: (token) => {
        try {
            const decoded = jwt.decode(token, process.env.JWT_KEY);

            if (!decoded) {
                return false;
            }
            return decoded;
        } catch (error) {
            return false;
        }
    }
}