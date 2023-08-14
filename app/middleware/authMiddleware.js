const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (req,res,next) => {
    const accessToken = req.cookies.accessToken
    if(accessToken){
        jwt.verify(accessToken, 'tokpedplay secret',(error,decodedToken)=>{
            if(error){
                console.log(error.message);
                res.status(400).send('Token Expired');
            }else{
                next();
            }
        })
    }else{
        res.status(400).send('Unauthorized')
    }
}

const checkUser = (req,res,next) => {
    const accessToken = req.cookies.jwt;
    if(accessToken){
        jwt.verify(accessToken, 'tokpedplay secret', async (error,decodedToken)=>{
            if(error){
                res.status(400).send(error.message);
                next()
            }else{
                let user = await User.findById(decodedToken.id);
                return(user);
                next();
            }
        })
    }
}

module.exports = { requireAuth };