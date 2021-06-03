const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post_id : {
        required :true,
        type : String
    } ,
    
    username : {
        required : true,
        type : String
    },

    usercomment : {
        required : true,
        type : String
    }
})

module.exports = mongoose.model('comment', commentSchema);