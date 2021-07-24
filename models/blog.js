const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    imageLink:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }

});

const blogs = mongoose.model('blog',blogSchema);

module.exports = blogs;

