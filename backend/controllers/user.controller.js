const User = require("../models/user.model");
const { validationResult } = require("express-validator");
const Blacklist = require("../models/blacklist.model");

module.exports.registerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() }).status(400);
  }

  try {
    const { fullname, email, password } = req.body;

    const isUserAlready = await User.findOne({ email });
  
    if (isUserAlready) {
      return res.status(401).json({ message: "user already exists" });
    }
  
    // create DB user model
  
    const user = new User({
      fullname,
      email,
      password,
    });
    //hash password
    await user.hashPassword();
  
    await user.save();
  
    // console.log(user);
  
    //create token
  
    const token = user.generateToken();
  
    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.json({error:error.message}).status(400);
    
  }
 
};


module.exports.loginController=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() }).status(400);
    }

 try {
    const {email,password}=req.body;
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return res.json({message:"user not found"}).status(404);
        
    }
    // console.log(user);

   const isMatch= await user.comparePassword(password);

   if(!isMatch){
    return res.json({message:"incorrect password"}).status(400);
   }

   //gen token

   const token=await user.generateToken();

   res.json({message:"logged in successfully",user,token});
    
 } catch (error) {
    res.json({error:error.message}).status(400);

 }




}

module.exports.profileController=async(req,res)=>{
  try {
    // Find the user by ID from the token payload
    // console.log(req.user);
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'User profile retrieved successfully.',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
}

module.exports.logoutController=async(req,res)=>{
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return res.status(400).json({ message: 'No token provided.' });
    }

    // Add the token to the blacklist
    const blacklistedToken = new Blacklist({ token });
    await blacklistedToken.save();

    // Optional: Clear cookies (if using cookies to store tokens)
    // res.clearCookie('token');

    res.status(200).json({ message: 'Logout successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed. Please try again.', error: error.message });
  }
}

