const express = require ('express');
const router = express.Router();
const product = require('../controllers/productController')

router.get("/:videoid/", product.getAll);
router.post("/:videoid/", product.create);
router.get("/:videoid/:id", product.getOne);


module.exports = router;