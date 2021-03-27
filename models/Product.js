//! Destructure Schema and model from our connected mongoose
const { Schema, model } = require('../db/connection');

///////////////////////////////////
//! DEFINE OUR SCHEMA
///////////////////////////////////

const ProductSchema = new Schema(
    {
        name: String,
        description: String,
        img: String, // <---- this will hold an image url
        price: Number,
        qty: Number,
    },
    { timestamps: true }
);

///////////////////////////////////
//! DEFINE OUR MODEL
///////////////////////////////////

const Product = model('Product', ProductSchema);

///////////////////////////////////
//! Export Our Model
///////////////////////////////////

module.exports = Product;
