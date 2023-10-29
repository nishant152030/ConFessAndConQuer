const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"name is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    image:{
        type:String
    }
})

module.exports = new mongoose.model('userModel',UserSchema);