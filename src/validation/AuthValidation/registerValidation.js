const isEmpty = require("is-empty")

module.exports = (body) => {
    let errors = {}
    if (isEmpty(body.name)) {
        errors.name = 'Name field is required'
    }
    if (isEmpty(body.email)) {
        errors.email = 'Email field is required'
    }
    if (isEmpty(body.password)) {
        errors.password = 'Password field is required'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}