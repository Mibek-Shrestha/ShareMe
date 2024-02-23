require("dotenv").config();
const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;

const connectToDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
}

connectToDb();