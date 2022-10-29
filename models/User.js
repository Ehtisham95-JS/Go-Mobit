const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Name"]
    },
    email:{
        type:String,
        required: [true, 'Please Provide email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    phone: {
        type:Number,
        required:[true, 'Please Enter Mobile Number']
    },
    age: {
        type:Number,
        required: [true, "Please Provide Age"]
    }
},{timestamps:true})


module.exports = mongoose.model('User', userSchema);