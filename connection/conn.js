const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/toggleData').then(()=>{
    console.log("Connection to database");
}).catch((err)=>{
    console.log(err);
});