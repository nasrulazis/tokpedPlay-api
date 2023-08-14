const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        required:true,
        type:String,
    },
    price:{
        required:true,
        type:Number,
    },
    linkProduct:{
        required:true,
        type:String
    },
    linkImageProduct:{
        required:true,
        type:String
    },
});

module.exports = mongoose.model('Product', productSchema)