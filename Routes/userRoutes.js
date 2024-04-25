const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const checkUserAuth = require("../middlewares/auth-middleware.js");
const cors = require("cors");

router.use(cors())

//Route Level Middleware - To Protect Route
router.use('/changepassword',checkUserAuth)
router.use('/loggeduser',checkUserAuth)

//Public Routes
router.post('/register',userController.userRegistration)
router.post('/login',userController.userLogin)
router.post('/send-reset-password-email',userController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token',userController.userPasswordReset)


//Protected Routes
router.post('/changepassword',userController.changeUserPassword)
router.get('/loggeduser',userController.loggedUser)


module.exports = router