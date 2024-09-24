const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const userSchema = new mongoose.Schema({
    "name": String,
    "address": String
});

const userModel = mongoose.model('user', userSchema)
mongoose.connect('mongodb://127.0.0.1:27017/myntra').then(()=> {
    console.log("db connected")
});


app.get("/", async(req, resp)=> {
    const user = await userModel.find()
    console.log("called", user );
    resp.send("Hello World")
})

app.listen(PORT, ()=> {
    console.log(`Server stared on ${PORT}`)
})