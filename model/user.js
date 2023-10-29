// user.js
const Mongoose = require("mongoose")
const UserSchema = new Mongoose.Schema({
 email : { type: String, 
    // required: true,
    // index:true,
    // unique:true,
    // sparse:true},
 },
  username: {
    type: String,
    // unique: true,
    required: true,
    sparse:true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  secretKey: {type: String},
  role: {
    type: String,
    default: "Basic",
    null:true,
  },
  
})

const User = Mongoose.model("user", UserSchema)
module.exports = User