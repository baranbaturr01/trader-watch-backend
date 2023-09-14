const User = require('../../models/User')
const bcrypt = require('bcrypt')
const isEmpty = require('is-empty')
module.exports = (body) => {

    let errors = {}

    if (isEmpty(body.email)) {
        errors.email = 'Email field is required'
    }
    if (isEmpty(body.password)) {
        errors.password = 'Password field is required'
    }

    if (!isEmpty(body.email) && !isEmpty(body.password)) {
        return User.findOne({ email: body.email }).then(user => {
            if (!user) {
                errors.email = 'User not found'
            }

            if (user) {
                const password = bcrypt.compareSync(body.password, user.password || '')
                if (!password) {
                    errors.password = 'Password incorrect'
                }
            }

        }).then(() => {
            return {
                errors,
                isValid: isEmpty(errors)
            }
        })
    }
    else {
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }
}