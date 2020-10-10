var express = require('express');
var router = express.Router();
var { signUpController, getAllUserController, getDetailUserController, deleteUserController, updateUserController, loginController } = require("../controllers/userController");
let { checkUser, checkAuth, checkAdmin } = require("../middleware/auth")
router.use(checkAuth)

router.get("/", getAllUserController);
router.get("/:idUser", getDetailUserController);
router.post("/login", loginController);

router.use(checkAdmin)


router.delete("/:idUser", deleteUserController);
router.put("/:idUser", updateUserController);
router.use(checkUser)
router.post('/', signUpController);

module.exports = router;
