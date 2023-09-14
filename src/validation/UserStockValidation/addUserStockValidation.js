const isEmpty = require('is-empty');

module.exports = (body) => {
    let errors = {}
    if (isEmpty(body.name)) {
        errors.name = 'Name field is required'
    }
    if (isEmpty(body.price)) {
        errors.price = 'Price field is required'
    }
    if (isEmpty(body.volume)) {
        errors.volume = 'Volume field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}