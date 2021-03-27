//! create our new router
const router = require('express').Router();
const { test, index } = require('../controllers/products');
const auth = require('../utils/auth');

///////////////////////////////
//! Router Specific Middleware
////////////////////////////////

////////////////////////////////
//! Router Specific Routes
////////////////////////////////

//* INDEX
router.get('/all', auth, index);

//* TEST
router.get('/test', auth, test);

////////////////////////////////
//! Export the Router
////////////////////////////////

module.exports = router;
