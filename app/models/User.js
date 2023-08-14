const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    image:{
        required:false,
        type:String,
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
});

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        if(password===user.password){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

module.exports = mongoose.model('User', userSchema)