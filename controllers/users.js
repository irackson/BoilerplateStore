require('dotenv').config();

const { log } = require('mercedlogger');

const bcrypt = require('bcryptjs');
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
const adminCode = process.env.ADMIN_CODE || '';
////////////////////////
//! Import Models
////////////////////////
const User = require('../models/User');
const Product = require('../models/Product');

///////////////////////////
//! Controller Functions
///////////////////////////

const getCreate = async (req, res) => {
    req.session.user = undefined;
    res.render('users/create');
};

const createSubmit = async (req, res) => {
    //TODO: DEAL WITH TAKEN USERNAME (MUST BE  UNIQUE)

    if (
        req.body.admin === 'on' &&
        (req.body.admin_code === adminCode ||
            req.body.admin_code === adminCode.toLowerCase())
    ) {
        req.body.admin = true;
    } else {
        req.body.admin = false;
    }

    const salt = await bcrypt.genSalt(saltRounds);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = await User.create(req.body);
    res.redirect('/users/login');
};

const getLogin = async (req, res) => {
    req.session.user = undefined;
    res.render('users/login');
};

const loginSubmit = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            const result = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (result) {
                req.session.user = user.username;
                req.session.admin = user.admin;
                res.redirect('/products');
            } else {
                res.status(400).json({ error: 'Password is wrong' });
            }
        } else {
            res.status(400).json({ error: 'No User by That Name' });
        }
    } catch (error) {
        res.json(error);
    }
};

const logout = (req, res) => {
    req.session.user = undefined;
    req.session.admin = undefined;
    res.render('home', {
        loggedIn: req.session.user,
    });
};

const getClientCart = async (req, res) => {
    if (req.session.admin) {
        res.redirect('/users/orders');
    } else {
        /* const user = await User.findOne(
            { username: req.session.user },
            '-password'
        ); */

        const user = await User.findOne({
            username: req.session.user,
        }).populate('cart.items');

        // console.log(user);
        console.log(`username: ${user.username}`);
        console.table(user.cart.items);

        res.render('users/cart', {
            username: user.username,
            items: user.cart.items,
            discount: user.cart.discount,
            loggedIn: req.session.user,
            admin: req.session.admin,
        });
    }
};

const getAllOrders = async (req, res) => {
    const users = await User.find({ admin: false }, '-password');
    res.render('users/orders', {
        users,
    });
};

//////////////////////////////
//! Export Controller
//////////////////////////////
module.exports = {
    getCreate,
    createSubmit,
    getLogin,
    loginSubmit,
    logout,
    getClientCart,
    getAllOrders,
};
