const { log } = require('mercedlogger');

////////////////////////
//! Import Models
////////////////////////
const Product = require('../models/Product');
///////////////////////////
//! Controller Functions
///////////////////////////

const index = (req, res) => {
    res.render('products/index');
};

const show = (req, res) => {
    res.render('products/show');
};

const newProduct = (req, res) => {
    res.render('products/new');
};

const create = (req, res) => {
    res.redirect('/products');
};

const edit = (req, res) => {
    res.render('products/edit');
};

const update = (req, res) => {
    // res.redirect(`${req.params.id}`);
};

const destroy = (req, res) => {
    res.send(
        `You are logged in as ${req.session.user}, an admin, so you may see this page`
    );
};

//////////////////////////////
//! Export Controller
//////////////////////////////
module.exports = { index, show, newProduct, create, edit, update, destroy };
