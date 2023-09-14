const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

return mongoose.connect('mongodb://localhost:30050/trader', {
}).then(() => {
    console.log("MongoDB connected");
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api', require('./router/router'));

    const port = process.env.PORT || 3050;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})
