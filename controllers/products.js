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
    const product = await Product.findById(req.params.id);
    res.render('products/edit', {
        product,
        loggedIn: req.session.user,
        admin: req.session.admin,
    });
};

const update = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const edits = req.body;
    console.log(product);
    console.log(edits);
    for (const property in edits) {
        if (edits[property] !== '') {
            product[property] = edits[property];
        }
    }
    console.log(product);
    await Product.findByIdAndUpdate(req.params.id, product);
    res.redirect(`${req.params.id}`);
};

const destroy = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
};

//////////////////////////////
//! Export Controller
//////////////////////////////
module.exports = { index, show, newProduct, create, edit, update, destroy };
