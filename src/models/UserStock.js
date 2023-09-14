const mongoose = require('mongoose');

const shcema = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    volume: {
        type: Number
    },
    value: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'user-stocks'
});


module.exports = mongoose.model('Stock', shcema);