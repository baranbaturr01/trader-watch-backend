
const exoress = require('express');
const router = exoress.Router();
const checkUserTokenMiddleware = require('../src/middleware/checkUserToken');

//AUTH
router.post('/auth/register', require('../src/controller/Auth/register'));
router.post('/auth/login', require('../src/controller/Auth/login'));

//Trader
router.get('/trader', require('../src/controller/Trader/getTraders'));

//user-stock
router.post('/create-user-stock', checkUserTokenMiddleware, require('../src/controller/UserStock/createUserStock'));
router.get('/user-stocks', checkUserTokenMiddleware, require('../src/controller/UserStock/getUserStocks'));

module.exports = router;