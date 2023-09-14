const UserStock = require("../../models/UserStock");

module.exports = (req, res) => {


    const user = req.user;

    return UserStock.find({ user_id: user._id }).then(userStocks => {

        if (!userStocks) {
            return res.status(500).json({
                message: 'UserStocks not found!'
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                userStocks: userStocks
            }

        });


    })
}
