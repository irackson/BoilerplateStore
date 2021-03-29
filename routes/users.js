//! create our new router
const router = require('express').Router();
const {
    getCreate,
    createSubmit,
    getLogin,
    loginSubmit,
    logout,
    getClientCart,
    getAllOrders,
} = require('../controllers/users');
const { isAuthenticated, isAuthorized } = require('../utils/auth');

///////////////////////////////
//! Router Specific Middleware
////////////////////////////////

////////////////////////////////
//! Router Specific Routes
////////////////////////////////

//* CREATE PAGE
router.get('/create', getCreate);

//* CREATE SUBMIT
router.post('/create', createSubmit);

//* LOGIN PAGE
router.get('/login', getLogin);

//* LOGIN SUBMIT
router.post('/login', loginSubmit);

//* LOGOUT
router.get('/logout', logout);

//* CLIENT CART PAGE
router.get('/cart', isAuthenticated, getClientCart);

//* ADMIN ORDERS PAGE
router.get('/orders', isAuthenticated, isAuthorized, getAllOrders);

////////////////////////////////
//! Export the Router
////////////////////////////////

module.exports = router;
