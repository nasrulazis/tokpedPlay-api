const Video = require('../models/Video')
const jwt = require('jsonwebtoken')

exports.create =(req,res)=>{
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        res.status(400).send('Anauthorized');
    }
    const payload = jwt.verify(accessToken, 'tokpedplay secret')

    const video = new Video({
        title: req.body.title,
        urlThumbnail: req.body.urlThumbnail,
        linkVideo: req.body.linkVideo,
        user:payload.id
    });

    try {
        const videoToSave = video.save();
        res.status(200).json(video);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.getAll = async (req,res)=>{
    try {
        const video = await Video.find().populate(['user']);
        res.status(200).json({message:'Success', data:video});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.getOne = async (req,res)=>{
    try {
        const video = await Video.findById(req.params.id).populate(['products','comments','user']);
        res.json(video);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.update = async (req,res)=>{
    try {
        const id = req.params.id;
        const updatedData=req.body;
        const options = {new:true};

        const result = await Video.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.delete = async (req,res) =>{
    try {
        const id = req.params.id;
        const deleteData = await Video.findByIdAndDelete(id);
        res.send('Video deleted..');
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.searchVideo = async (req, res) => {
    try{
        const toLowerCase = req.query.q.toLowerCase()
        const video = await Video.find({
            title: {$regex: toLowerCase, $options:"i"}
        })
        if (!video) {
            return res.status(400).json({message: "User not found"});
        }
        res.json({data :video});
    }catch (e){
        res.status(500).json(error)
    }
}