const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
{
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone_no:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
});



const users = mongoose.model('user',userSchema);

module.exports = users;
