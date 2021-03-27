//! create our new router
const router = require('express').Router();
const {
    getCreate,
    createSubmit,
    getLogin,
    loginSubmit,
    logout,
    test,
} = require('../controllers/users');
const auth = require('../utils/auth');

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

//* TEST
router.get('/test', auth, test);

////////////////////////////////
//! Export the Router
////////////////////////////////

module.exports = router;
