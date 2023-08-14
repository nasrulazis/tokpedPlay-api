const {Router} = require('express')
const router = Router();
const video = require('../controllers/videoController')

router.get("/", video.getAll);
router.get("/search", video.searchVideo);
router.get("/:id", video.getOne);
router.post("/", video.create);
router.patch("/:id", video.update);
router.delete("/:id", video.delete);


module.exports = router;