//! create our new router
const router = require('express').Router();
const { test, index } = require('../controllers/products');
const { isAuthenticated, isAuthorized } = require('../utils/auth');

///////////////////////////////
//! Router Specific Middleware
////////////////////////////////

////////////////////////////////
//! Router Specific Routes
////////////////////////////////

//* INDEX
router.get('/all', isAuthenticated, index);

//* TEST
router.get('/test', isAuthorized, test);

////////////////////////////////
//! Export the Router
////////////////////////////////

module.exports = router;
