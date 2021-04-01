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
    // await User.deleteMany({}); // to clear accounts
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
        {
            name: 'Apple',
            description: 'A red apple!',
            img:
                'data:image/jpeg;base64,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',
            price: 0.99,
            qty: 23,
        },
        {
            name: 'Banana',
            description: 'A yellow banana',
            img:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6G9K2vNZ82htFGb0KVk723nfJ51H9hQ2n6A&usqp=CAU',
            price: 0.79,
            qty: 123,
        },
        {
            name: 'Watermelon',
            description: 'A fruit with seeds',
            img:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWYiYVB1NtJZXbHpenzJTZGWEDNQD4kH69bg&usqp=CAU',
            price: 2.0,
            qty: 20,
        },
        {
            name: 'Apple',
            description: 'This one is green 😀',
            img:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6qdi81EPyk7DXyXk58bH6q8_mVb7upI154g&usqp=CAU',
            price: 0.42,
            qty: 45,
        },
        {
            name: 'Avocado',
            description: 'A metro snack',
            img:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb5FHLqilPGkoQmI-ziSYFNicocjKSAeCa4w&usqp=CAU',
            price: 100,
            qty: 101,
        },
        {
            name: 'Grapes',
            description: 'does not come with person to feed you one by one 😞',
            img:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAkvcx0o5_8ebZcfFCwXE7joZuzw1IExaQgA&usqp=CAU',
            price: 5,
            qty: 1,
        },
        {
            name: 'Grapes+ 😉',
            description:
                'the dev will feed to you. price is totally justified.',
            img:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAkvcx0o5_8ebZcfFCwXE7joZuzw1IExaQgA&usqp=CAU',
            price: 999,
            qty: 3,
        },
        {
            name: 'Cherries',
            description: 'Great in smoothies',
            img:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj8f5LRf58969zu8O4nICtejinmsoP_HTqYw&usqp=CAU',
            price: 3,
            qty: 0,
        },
    ]);

    //--------------------
};

// run seed function
mongoose.connection.on('open', () => {
    // Run Seed Function
    seed();
});
