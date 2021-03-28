//! create our new router
const router = require('express').Router();
const {
    index,
    show,
    newProduct,
    create,
    edit,
    update,
    destroy,
} = require('../controllers/products');
const { isAuthenticated, isAuthorized } = require('../utils/auth');

///////////////////////////////
//! Router Specific Middleware
////////////////////////////////

////////////////////////////////
//! Router Specific Routes
////////////////////////////////
//* SHOW ALL
router.get('/', index);

//* MAKE NEW
router.get('/new', isAuthenticated, isAuthorized, newProduct);

//* SHOW ONE
router.get('/:id', isAuthenticated, show);

//* MAKE EDIT
router.get('/:id/edit', isAuthenticated, isAuthorized, edit);

//* PROCESS NEW
router.post('/', isAuthenticated, isAuthorized, create);

//* PROCESS EDIT
router.put('/:id', isAuthenticated, isAuthorized, update);

//* DESTROY ONE
router.delete('/:id', isAuthenticated, isAuthorized, destroy);

/* //! CATCHALL
router.get('/*', (req, res) => {
    res.redirect('/');
}); */
////////////////////////////////
//! Export the Router
////////////////////////////////

module.exports = router;
