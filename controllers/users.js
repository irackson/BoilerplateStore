require('dotenv').config();

const bcrypt = require('bcryptjs');
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
////////////////////////
//! Import Models
////////////////////////
const User = require('../models/User');

///////////////////////////
//! Controller Functions
///////////////////////////

const getCreate = async (req, res) => {
    res.render('users/create');
};

const createSubmit = async (req, res) => {
    //TODO: DEAL WITH TAKEN USERNAME (MUST BE  UNIQUE)
    const salt = await bcrypt.genSalt(saltRounds);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = await User.create(req.body);
    console.log(user);
    res.redirect('/users/login');
};

const getLogin = async (req, res) => {
    res.render('users/login');
};

const loginSubmit = async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user) {
            const result = await bcrypt.compare(
                req.body.password,
                user.password
            );
        } else {
            res.status(400).json({ error: 'No User by That Name' });
        }
    } catch (error) {
        res.json(error);
    }
};

//////////////////////////////
//! Export Controller
//////////////////////////////
module.exports = {
    getCreate,
    createSubmit,
    getLogin,
    loginSubmit,
};
