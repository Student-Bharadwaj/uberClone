const express=require("express");
const router=express.Router();
const {body}=require("express-validator");
const {registerController, loginController, profileController, logoutController}=require("../controllers/user.controller");
const { authUser }=require("../middlewares/auth.middleware")


router.post("/register",[
      // Validation rules
      body('email').isEmail().withMessage('Please enter a valid email'),
      body('password')
        .isLength({ min: 3 })
        .withMessage('Password must be at least 3 characters long'),
      body('fullname.firstname')
        .not()
        .isEmpty()
        .withMessage('Firstname is required'),
    
],registerController);

router.post("/login",[
    body('email').isEmail().withMessage('Please enter a valid email'),
      body('password')
        .isLength({ min: 3 })
        .withMessage('Password must be at least 3 characters long'),
],loginController);

router.get("/profile",authUser,profileController);

router.get("/logout",authUser,logoutController);


module.exports=router;