const {Router} = require('express')
const router = Router();
const user = require('../controllers/userController')

router.get("/", user.getAll);
router.get("/user", user.getLoggedInUser);
router.get("/logout", user.logout);
router.get("/:id", user.getOne);
router.post("/signup", user.signup);
router.post("/login", user.login);

module.exports = router;