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

const test = (req, res) => {
    res.send(
        `You are logged in as ${req.session.user}, an admin, so you may see this page`
    );
};

//////////////////////////////
//! Export Controller
//////////////////////////////
module.exports = { test, index };
