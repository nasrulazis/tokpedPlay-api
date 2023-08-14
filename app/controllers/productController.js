const Product = require('../models/Product')
const Video = require('../models/Video')

exports.create = async (req, res) => {
    try {
        let videoId = req.params.videoid;
        const video = await Video.findById(videoId);
        
        if (!video) {
            return res.status(400).json({ message: "Video not found" });
        } else {
            const product = new Product({
                productName: req.body.productName,
                price: req.body.price,
                linkProduct: req.body.linkProduct,
                linkImageProduct:req.body.linkImageProduct
            });
            const productToSave = await product.save();
            await Video.updateOne(
                {
                    _id: videoId
                },
                {
                    $push: { products: productToSave._id }
                }
            );
            res.status(200).json({ message: "Product Added Successfully", data: product });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getAll = async (req,res)=>{
    try {
        const product = await Video.findById(req.params.videoid).populate("products");
        if (!product) {
            res.status(400).json({error:"Video doesn't exist"})
        } else {
            res.status(200).json({message:"Success",data:product.products});
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.getOne = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.update = async (req,res)=>{
    try {
        const id = req.params.id;
        const updatedData=req.body;
        const options = {new:true};

        const result = await Product.findByIdAndUpdate(
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
        const deleteData = await Product.findByIdAndDelete(id);
        res.send('Product deleted..');
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}