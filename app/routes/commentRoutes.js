const express = require ('express');
const router = express.Router();
const comment = require('../controllers/commentController')

router.get("/:videoid/", comment.getAll);
router.post("/:videoid/", comment.create);
router.get("/:videoid/:id", comment.getOne);


module.exports = router;