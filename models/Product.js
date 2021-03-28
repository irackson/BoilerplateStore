//! Destructure Schema and model from our connected mongoose
const { Schema, model } = require('../db/connection');

///////////////////////////////////
//! DEFINE OUR SCHEMA
///////////////////////////////////

const ProductSchema = new Schema(
    {
        name: { type: String, default: 'Thingamajig' },
        description: { type: String, default: 'indescribable' },
        img: {
            type: String,
            default:
                'https://www.clipartkey.com/mpngs/m/34-345049_clip-art-mystery-box-clip-art-cardboard-box.png',
        },
        price: { type: Number, default: 0.01 },
        qty: { type: Number, default: 0 },
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
