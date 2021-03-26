//!  __   ___  __   ___       __   ___       __     ___  __
//! |  \ |__  |__) |__  |\ | |  \ |__  |\ | /  ` | |__  /__`
//! |__/ |___ |    |___ | \| |__/ |___ | \| \__, | |___ .__/

//* Require Modules
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');
const { log } = require('mercedlogger');

//! define env variables
const PORT = process.env.PORT || '2021';

//! Import the index routers
const HomeRouter = require('./routes/home');

//! __   __   ___      ___  ___          __   __
//! /  ` |__) |__   /\   |  |__      /\  |__) |__)
//! \__, |  \ |___ /~~\  |  |___    /~~\ |    |

//! Create the Express App
const app = express();

//!         ___          ___       __          ___
//! \  / | |__  |  |    |__  |\ | / _` | |\ | |__
//!  \/  | |___ |/\|    |___ | \| \__> | | \| |___

//! Configure the App (app.set)
//! We'll use the ejs view engine
app.set('view engine', 'ejs');

//!          __   __        ___            __   ___
//! |\/| | |  \ |  \ |    |__  |  |  /\  |__) |__
//! |  | | |__/ |__/ |___ |___ |/\| /~~\ |  \ |___

app.use(cors()); // prevent cors errors

//! enable method override
app.use(methodOverride('_method'));

//! serves the public folder as static
// public is where css / scss files
app.use(express.static('public'));

//! morgan for logging
// app.use('/', morgan('tiny')); // "dev" | "tiny" | "combined"

app.use(express.json()); // parse json bodies

//! urlencoded into order to receive data from forms
app.use(express.urlencoded({ extended: false }));

//! auth
app.use(
    session({
        secret: process.env.SECRET || 'supersecret',
        resave: false,
        saveUninitialized: false,
    })
);

//! Mount Middleware (app.use)
app.use('/', (req, res, next) => {
    req.time = new Date().toLocaleTimeString();
    // console.log(req.time);
    //* go to next middleware function
    next();
});

//!   __   __       ___         __
//! |__) /  \ |  |  |  | |\ | / _`
//! |  \ \__/ \__/  |  | | \| \__>

////////// Express Session Playground //////////
/* Uncomment the code below to create some routes to explore how sessions work. None of this code is required for authentication to work.

Instructions:
1) Visit http://localhost:3000/first-route to save a favFood of 'pizza' in your session.
2) Visit http://localhost:3000/second-route. If your favFood is 'pizza', you'll see a Pizza Party message. Else you'll see a different message.
3) Visit http://localhost:3000/update-route. This will change your favFood to "mom's spaghetti"
4) Now Visit http://localhost:3000/second-route again and see how it changes.
5) Visit http://localhost:3000/times-visited. The counter will update each time you visit. This is stored in your session as well.
*/

app.get('/add-to-cookie', function (req, res) {
    req.session.favFood = 'pizza';
    res.send(req.session);
});

app.get('/check-cookie', function (req, res) {
    if (req.session.favFood === 'pizza') {
        res.send('<h1>You have visited /add-to-cookie</h1>');
    } else {
        res.send('<h1>You have NOT visited /add-to-cookie</h1>');
    }
});

app.get('/update-cookie', function (req, res) {
    const oldFood = req.session.favFood;
    req.session.favFood = "mom's spaghetti";
    res.send(
        `<h1>You updated the session cookie value for \"fav food\" from \'${oldFood}\' to \'${req.session.favFood}\'</h1>`
    );
});

app.get('/times-visited', function (req, res) {
    if (req.session.visits) {
        req.session.visits++;
        res.send(
            `<h1>You've visited this page ${
                req.session.visits - 1
            } time(s)</h1>`
        );
    } else {
        req.session.visits = 1;
        res.send(`<h1>This is your first time visiting this page</h1>`);
    }
});

app.get('/destroy-session', function (req, res) {
    //any route will work
    req.session.destroy(function (err) {
        if (err) {
            res.send(
                `<h1>For some reason the session object (cookie) has not been destroyed</h1><br>${err.message}`
            );
        } else {
            res.send(`<h1>The session object (cookie) has been destroyed</h1>`);
        }
    });
});

/////////////////// END SESSION PLAYGROUND /////////////////////////

//! Mount Routes
app.use('/', HomeRouter);

//! Mount Catchall
// wildcard route catchall activated for any/all routes that aren't found and/or error out
// must go on the bottom
app.get('*', (req, res) => {
    res.redirect('/');
});

//!          __  ___  ___       ___  __
//! |    | /__`  |  |__  |\ | |__  |__)
//! |___ | .__/  |  |___ | \| |___ |  \

//! Tell the App to Listen on Port 3000
app.listen(PORT, function () {
    log.white('💻 EXPRESS 💻 ', `listening on port ${PORT}`);
});
