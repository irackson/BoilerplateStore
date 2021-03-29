// import the database connection
const mongoose = require('./connection');

//////////////////////////////////
// Import Your Models Below
/////////////////////////////////

const Product = require('../models/Product');
const User = require('../models/User');

/////////////////////////////////
// Do your Database Operations in Below Function
/////////////////////////////////
const seed = async () => {
    //--- CODE GOES HERE

    //clear collections before seeding
    await Product.deleteMany({});
    await User.deleteMany({}); // to clear accounts
    await Product.create([
        {
            name: 'Beans',
            description:
                'A small pile of beans. Buy more beans for a big pile of beans.',
            img: 'https://imgur.com/LEHS8h3.png',
            price: 5,
            qty: 99,
        },
        {
            name: 'Bones',
            description: "It's just a bag of bones.",
            img: 'https://imgur.com/dalOqwk.png',
            price: 25,
            qty: 0,
        },
        {
            name: 'Bins',
            description: 'A stack of colorful bins for your beans and bones.',
            img: 'https://imgur.com/ptWDPO1.png',
            price: 7000,
            qty: 1,
        },
    ]);

    //--------------------
};

// run seed function
mongoose.connection.on('open', () => {
    // Run Seed Function
    seed();
});
