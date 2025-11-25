require('dotenv').config({path: '../env'});
const mongoose = require('mongoose');
const connection = process.env.conn;

// mongoose.connect(connection)
//         .then(() => console.log('database Connected'))
//         .catch((error) => console.error('error -> ', error));

const connectToDb = async () => {
    try{
        await mongoose.connect(connection);
        console.log('database connected');
    }catch(error){
        console.error('error -> ', error);
        // process.exit(1);
    }
}

module.exports = connectToDb;


