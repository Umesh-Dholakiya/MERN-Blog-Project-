const mongoose = require("mongoose");

 mongoose.connect(`mongodb://127.0.0.1:27017/Blog_Project`);

 const connectDB = mongoose.connection;

 connectDB.on('connected' , (err) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log(`database successfully connected`);
 })