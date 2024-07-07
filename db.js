require('dotenv').config()
const mongoose = require('mongoose');

async function connectToMongo() {
    console.log("Connecting to Mongo.....");
    await mongoose.connect("mongodb+srv://Himanshu:YZaEoOPeXD8d2MrS@cluster1.tlqzqe2.mongodb.net/");
    console.log("Connected to Mongo");
    }

module.exports = connectToMongo;