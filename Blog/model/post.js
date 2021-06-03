const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : {
        type      : String ,
        required  : true,
        minlength : 5,
        maxlength : 70,
    } ,
    content : {
        type      : String ,
        required  : false,
        minlength : 3,
        maxlength : 2500,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('post', postSchema);