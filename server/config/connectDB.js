const mongoose = require('mongoose');

async function connectDB () {
    try{
        console.log("mongo url", process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL);
        const connect = mongoose.connection;
        
        connect.on('connected', () => {
            console.log("Connected to DB!");
        })

        connect.on('error', (error) => {
            console.log("Some is wrong in MongoDB", error);
        })
    } catch(e){
        console.log("Something is wrong" + e);
    }
}

module.exports = connectDB;