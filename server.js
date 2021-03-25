//!  __   ___  __   ___       __   ___       __     ___  __
//! |  \ |__  |__) |__  |\ | |  \ |__  |\ | /  ` | |__  /__`
//! |__/ |___ |    |___ | \| |__/ |___ | \| \__, | |___ .__/

//* Require Modules
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');
const { log } = require('mercedlogger');

//! define env variables
const PORT = process.env.PORT || '2021';

//! Import the index routers
// const indexRouter = require('./routes/index');

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

//! Mount Routes
// app.use('/', indexRouter);
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

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
