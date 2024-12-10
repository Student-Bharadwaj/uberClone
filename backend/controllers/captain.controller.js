const Captain = require("../models/captain.model");
const { validationResult } = require("express-validator");
const Blacklist=require("../models/blacklist.model")

module.exports.captainRegisterController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array() }).status(400);
  }
try {
    
  const { fullname, email, password, vehicle } = req.body;

  //check if captain exists

  const isCaptainAlready = await Captain.findOne({ email });
  if (isCaptainAlready) {
    return res.json({ message: "captain already exists" }).status(401);
  }
  const hashedPassword = await Captain.hashPassword(password);

  const captain = await Captain.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email: email,
    password: hashedPassword,

    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    },
  });

const token=await captain.generateAuthToken();

// you can set to cookies --> (optional).

  res.json({message:"registered successfully",token,captain}).status(200);
    
} catch (error) {
    res.json({error:error.message}).status(400);
    
}


};

module.exports.captainLoginController=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.array() }).status(400);
    }

    try {
        
        const {email,password}=req.body;

        const captain=await Captain.findOne({email}).select("+password");
        if(!captain){
            return res.json({message:"captain not found!"}).status(400);

        }

        const isMatch=await captain.comparePassword(password);
        if(!isMatch){
            return res.json({message:"incorrect password"}).status(401);

        }

        const token=await captain.generateAuthToken();

        //set to cookies -->(optional).

        res.json({message:"login successfull",token,captain}).status(200);




    } catch (error) {
        res.json({error:error.message}).status(400);
        
    }
}

module.exports.captainProfileController=async(req,res)=>{

    try {
        // Find the captain by ID from the token payload
    // console.log(req.captain);

      
        const captain = await Captain.findById(req.captain.id).select('-password'); // Exclude the password field
    
        if (!captain) {
          return res.status(404).json({ message: 'captain not found.' });
        }
    
        res.status(200).json({
          message: 'Captain profile retrieved successfully.',
          captain,
        });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error: error.message });
      }
}

module.exports.captainLogoutController=async(req,res)=>{
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