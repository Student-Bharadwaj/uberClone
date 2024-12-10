const jwt = require('jsonwebtoken');
const Blacklist = require("../models/blacklist.model"); // Optional: Use this if you’re managing a blacklist

// Authentication middleware
module.exports. authUser = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Format: "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: 'Invalid token format.' });
    }

    // Optional: Check if the token is blacklisted
    const blacklisted = await Blacklist.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ message: 'Token is blacklisted. Please log in again.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user data to the request
    req.user = decoded;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized. Invalid or expired token.' });
  }
};

module.exports.authCaptain=async(req,res,next)=>{

  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Format: "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: 'Invalid token format.' });
    }

    // Optional: Check if the token is blacklisted
    const blacklisted = await Blacklist.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ message: 'Token is blacklisted. Please log in again.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user data to the request
    req.captain = decoded;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized. Invalid or expired token.' });
  }

}
