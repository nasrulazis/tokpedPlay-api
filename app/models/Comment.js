const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment:{
        required:true,
        type:String,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:false,
    }
},
{ 
timestamps: true 
});

module.exports = mongoose.model('Comment', commentSchema)