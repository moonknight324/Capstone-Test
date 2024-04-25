const mongoose = require("mongoose");

const MONGOOSE_URI = process.env.MONGOOSE_URI;

const connectToDB = async () => {
    try {
        const connect = await mongoose.connect(MONGOOSE_URI);
        console.log("Connected to MongoDB");
    }catch(err){
        console.log("Error : ",err)
    }
}

module.exports = connectToDB