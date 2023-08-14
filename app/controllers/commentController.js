const Comment = require('../models/Comment')
const Video = require('../models/Video')
const jwt = require('jsonwebtoken')

exports.create = async (req, res) => {

    try {
        const accessToken = req.cookies.accessToken;
        let videoId = req.params.videoid;
        const video = await Video.findById(videoId);
        const payload = jwt.verify(accessToken, 'tokpedplay secret')
        if (!video) {
            return res.status(400).json({ message: "Video doesn't exist" });
        } else {
            const comment = new Comment({
                comment: req.body.comment,
                user:payload.id
            });
            const commentToSave = await comment.save();
            await Video.updateOne(
                {
                    _id: videoId
                },
                {
                    $push: { comments: commentToSave._id }
                }
            );
            res.status(200).json({ message: "Comment Added Successfully", data: comment });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getAll = async (req,res)=>{
    try {
        const comment = await Video.findById(req.params.videoid).populate("comments");
        if (!comment) {
            res.status(400).json({error:"Video doesn't exist"})
        } else {
            res.status(200).json({message:"Success",data:comment.comments});
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.getOne = async (req,res)=>{
    try {
        const comment = await Comment.findById(req.params.id);
        res.json(comment);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.update = async (req,res)=>{
    try {
        const id = req.params.id;
        const updatedData=req.body;
        const options = {new:true};

        const result = await Comment.findByIdAndUpdate(
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
        const deleteData = await Comment.findByIdAndDelete(id);
        res.send('Product deleted..');
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}