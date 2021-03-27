// import the database connection
const mongoose = require('./connection');
//////////////////////////////////
// Import Your Models Below
/////////////////////////////////

/////////////////////////////////
// Do your Database Operations in Below Function
/////////////////////////////////
const seed = async () => {
    // Drop the Database before seeding
    mongoose.connection.db.dropDatabase();

    //--- CODE GOES HERE
    console.log('seed file');
    //--------------------
    // mongoose.disconnect();
};
// run seed function
mongoose.connection.on('open', () => {
    // Run Seed Function
    seed();
});
