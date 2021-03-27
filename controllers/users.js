require('dotenv').config();

const { log } = require('mercedlogger');

const bcrypt = require('bcryptjs');
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
const adminCode = process.env.ADMIN_CODE || '';
////////////////////////
//! Import Models
////////////////////////
const User = require('../models/User');

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
                res.redirect('/products/all');
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
    res.json({ message: 'You have logged out' });
};

const test = (req, res) => {
    res.send(
        `You are logged in as ${req.session.user} so you may see this page`
    );
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
    test,
};
