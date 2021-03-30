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

async function usernameFree(attempt) {
    const users = await User.find({ username: attempt });
    if (users.length === 0) {
        return true;
    } else {
        return false;
    }
}

const createSubmit = async (req, res) => {
    //TODO: DEAL WITH TAKEN USERNAME (MUST BE  UNIQUE)

    if (await usernameFree(req.body.username)) {
        if (req.body.admin === 'on') {
            if (req.body.admin_code.toLowerCase() === adminCode.toLowerCase()) {
                req.body.admin = true;
            } else {
                res.json({
                    message:
                        'You have entered the wrong Admin Code. Account creation failed. Contact your web developer or call your employer for the right code, and then hit the back button and try again.',
                });
                return;
            }
        } else {
            req.body.admin = false;
        }

        const salt = await bcrypt.genSalt(saltRounds);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const user = await User.create(req.body);
        res.redirect('/users/login');
    } else {
        console.log('not making account');
        res.json({
            message:
                'An account already exists with this username. Account creation failed. Use the back button to create an account with a different username.',
        });
    }
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

async function removeDuplicatesAndCount(inputList) {
    /* based on https://stackoverflow.com/a/19395302 */

    let counts = {};
    inputList.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
    });
    let outputList = [];
    for (let i = 0; i < Object.values(counts).length; i++) {
        outputList.push({
            item: await Product.findById(Object.keys(counts)[i]),
            count: Object.values(counts)[i],
        });
    }
    return outputList;
}

async function removeDeleted(inputList) {
    let outputList = [];

    for (let i = 0; i < inputList.length; i++) {
        const item = await Product.findById(inputList[i]);
        if (item !== null) {
            outputList.push(inputList[i]);
        } else {
            inputList = inputList.filter((e) => e !== inputList[i]);
        }
    }
    return outputList;
}

const getClientCart = async (req, res) => {
    if (req.session.admin) {
        res.redirect('/users/orders');
    } else {
        const user = await User.findOne(
            {
                username: req.session.user,
            },
            '-password'
        );
        const updatedCart = await removeDeleted(user.cart.items);
        const displayCart = await removeDuplicatesAndCount(updatedCart);

        res.render('users/cart', {
            username: user.username,
            cart: displayCart,
            discount: user.cart.discount,
            loggedIn: req.session.user,
            admin: req.session.admin,
        });
    }
};

const getAllOrders = async (req, res) => {
    const users = await User.find(
        { admin: false, 'cart.items.1': { $exists: true } },
        '-password'
    );

    const displayCarts = [];
    for (let i = 0; i < users.length; i++) {
        const updatedCart = await removeDeleted(users[i].cart.items);
        const displayCart = await removeDuplicatesAndCount(updatedCart);
        displayCarts.push({
            username: users[i].username,
            cart: displayCart,
        });
    }
    res.render('users/orders', {
        displayCarts,
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
