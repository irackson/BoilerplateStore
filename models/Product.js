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

//? https://www.youtube.com/watch?v=5iz69Wq_77k
/* ProductSchema.pre('remove', async function (next) {
    try {
        await User.remove({
            _id: {
                $in: this.cart?.items,
            },
        });
        next();
    } catch (error) {
        next(error);
    }
}); */

///////////////////////////////////
//! DEFINE OUR MODEL
///////////////////////////////////

const Product = model('Product', ProductSchema);

///////////////////////////////////
//! Export Our Model
///////////////////////////////////

module.exports = Product;
