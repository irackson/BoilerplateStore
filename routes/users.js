//! create our new router
const router = require('express').Router();
const {
    getCreate,
    createSubmit,
    getLogin,
    loginSubmit,
} = require('../controllers/users');

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

////////////////////////////////
//! Export the Router
////////////////////////////////

module.exports = router;
