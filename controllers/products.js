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
    const products = await Product.find({ qty: { $gt: 0 } });
    res.render('products/index', {
        products,
    });
};

const show = async (req, res) => {
    res.render('products/show');
};

const newProduct = async (req, res) => {
    res.render('products/new');
};

const create = async (req, res) => {
    res.redirect('/products');
};

const edit = async (req, res) => {
    res.render('products/edit');
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
