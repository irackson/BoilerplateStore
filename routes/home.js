//! import router
const router = require('express').Router();
const UsersRouter = require('./users');
const ProductsRouter = require('./products');

///////////////////////////////
//! Router Specific Middleware
////////////////////////////////

router.use('/users', UsersRouter);
router.use('/products', ProductsRouter);

////////////////////////////////
//! Router Specific Routes
////////////////////////////////

router.get('/', (req, res) => {
    res.render('home', {
        loggedIn: req.session.user,
        admin: req.session.admin,
    });
});

////////////////////////////////
//! Export the Router
////////////////////////////////

module.exports = router;
