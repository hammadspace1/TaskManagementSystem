const mongoose = require("mongoose");

const Connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/EziTech");
        console.log("DataBase is Connected Successfully!");
    } catch (error) {
        console.log(error)
    }
}

module.exports = Connection;