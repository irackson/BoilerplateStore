//! Destructure Schema and model from our connected mongoose
const { Schema, model } = require('../db/connection');

///////////////////////////////////
//! DEFINE OUR SCHEMA
///////////////////////////////////

const UserSchema = new Schema(
    {
        username: String,
        password: String,
    },
    { timestamps: true }
);

///////////////////////////////////
//! DEFINE OUR MODEL
///////////////////////////////////

const User = model('User', UserSchema);

///////////////////////////////////
//! Export Our Model
///////////////////////////////////

module.exports = User;
