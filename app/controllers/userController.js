const User = require('../models/User')
const jwt = require('jsonwebtoken')

const maxAge = 3*24*60*60;
const createToken = (id) => {
    return jwt.sign({ id }, 'tokpedplay secret', {
        expiresIn: maxAge
    } )
}

exports.getAll = async (req,res) => {
    try {
        const user = await User.find();
        res.status(200).json({message:'Success', data:user});
    } catch (error) {
        
    }
}
exports.getOne = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        
    }
}

exports.getLoggedInUser = async (req,res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        res.status(400).send('Anauthorized');
    }
    const payload = jwt.verify(accessToken, 'tokpedplay secret')
    const user = await User.findById(payload.id);
    res.status(200).json(user);
}

exports.signup = async (req,res) => {
    const {name, image, email, password} = req.body;
    try {
        const user = await User.create({
            name:name,
            image:image,
            email:email,
            password:password,
        })
        const token = createToken(user._id)
        res.cookie('accessToken',token,{httpOnly:true, maxAge:maxAge*1000})
        res.status(201).json({user:user._id});
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}
exports.login = async (req,res) => {
    const {name, image, email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.cookie('accessToken',token,{
            httpOnly:true, 
            maxAge:maxAge*1000, 
            sameSite: "none", 
            secure:true
        })
        res.status(200).json({
            token,
            user})
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message)
    }
}

exports.logout = async (req,res) => {
    try {
        res.clearCookie('accessToken')
        res.status(201).json({});
    } catch (error) {
        res.status(400).send(error.message)
    }
}