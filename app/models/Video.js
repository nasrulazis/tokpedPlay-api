const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String,
    },
    urlThumbnail:{
        required:false,
        type:String,
    },
    linkVideo:{
        required:true,
        type:String
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:false,
    },
    products:[{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required:false,
    }],
    comments:[{
        type:mongoose.Types.ObjectId,
        ref:'Comment',
        required:false,
    }]

});

module.exports = mongoose.model('Video', videoSchema)