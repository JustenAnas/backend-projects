const mongoose = require('mongoose')


async function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("connected to db");
        
    })
    .catch(err=>{
        console.log("error happens while connecting to db");
        process.exit(1)//means close the server
    })
}
module.exports = connectDB