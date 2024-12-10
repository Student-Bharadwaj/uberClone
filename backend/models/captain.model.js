const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");



const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Firstname must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Lastname must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },

  location: {
    ltd: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});



// Method to hash a given password
captainSchema.statics.hashPassword = async function (password) {
    const saltRounds = 10; // Adjust as needed
    return await bcrypt.hash(password, saltRounds);
  };


  captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
  }

  // Method to generate an authentication token
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
      { id: this._id, email: this.email }, // Payload
      process.env.JWT_SECRET, // Secret key from environment variable
      { expiresIn: '1h' } // Token expiration time
    );
    return token;
  };


const Captain=mongoose.model("Captain",captainSchema);

module.exports=Captain;
