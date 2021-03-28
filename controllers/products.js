const { log } = require('mercedlogger');

////////////////////////
//! Import Models
////////////////////////
const User = require('../models/User');
const Product = require('../models/Product');
///////////////////////////
//! Controller Functions
///////////////////////////

const index = async (req, res) => {
    const products = req.session.admin
        ? await Product.find({})
        : await Product.find({ qty: { $gt: 0 } });
    res.render('products/index', {
        products,
        loggedIn: req.session.user,
        admin: req.session.admin,
    });
};

const show = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/show', {
        product,
        loggedIn: req.session.user,
        admin: req.session.admin,
    });
};

const newProduct = async (req, res) => {
    res.render('products/new', {
        loggedIn: req.session.user,
        admin: req.session.admin,
    });
};

const create = async (req, res) => {
    res.redirect('/products');
};

const edit = async (req, res) => {
    res.render('products/edit', {
        loggedIn: req.session.user,
        admin: req.session.admin,
    });
};

const update = async (req, res) => {
    // res.redirect(`${req.params.id}`);
};

const destroy = async (req, res) => {
    res.send(
        `You are logged in as ${req.session.user}, an admin, so you may see this page`
    );
};

//////////////////////////////
//! Export Controller
//////////////////////////////
module.exports = { index, show, newProduct, create, edit, update, destroy };
