const UserStock = require("../../models/UserStock");
const addUserStockValidation = require("../../validation/UserStockValidation/addUserStockValidation");


module.exports = (req, res, next) => {
    const { errors, isValid } = addUserStockValidation(req.body);
    const user = req.user;
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const name = req.body.name;
    const price = req.body.price;
    const volume = req.body.volume;
    const newUserStock = new UserStock({
        name: name,
        price: price,
        volume: volume,
        value: price * volume,
        user_id: user._id
    });

    return newUserStock.save().then(userStock => {

        if (!userStock) {
            return res.status(500).json({
                message: 'UserStock not created!'
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                message: 'UserStock created!',
            }

        });
    })


}