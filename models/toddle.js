const mongoose = require("mongoose");

const toddleSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        unique: true
        
    },
    profession : {
        type : String,
        required : true,
    },
    age :{
        type : Number,
        required : true,
    }
})

const Toddle = mongoose.model("Toddle", toddleSchema);
module.exports = Toddle;