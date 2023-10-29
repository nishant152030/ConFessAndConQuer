const express = require("express");
const mongoose = require("mongoose");
const User = require("./UserSchema");

const app = express();
app.use(express.json())

mongoose.connect("mongodb+srv://bhavdeep:syntax@cluster0.d7y0em3.mongodb.net/")
.then(()=>{
    console.log("connected");
});

app.post("/register",(req,res)=>{
    console.log(req.body)
    const {username,password} = req.body;


    const user = new User({
        username,
        password
    })
    const newUser = user.save();
    if(newUser){
        res.status(200).send("added to database")
    }
})


app.listen(3000,()=>{
    console.log("server running on port 3000")
})
