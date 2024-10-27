const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(process.env.MONGOURL)
    .then(response => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.log("Error connecting mongoDB: " + error)
    })
}


module.exports = connectDB