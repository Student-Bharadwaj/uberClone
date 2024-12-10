const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [ 3, 'First name must be at least 3 characters long' ],
      },
      lastname: {
        type: String,
        minlength: [ 3, 'Last name must be at least 3 characters long' ],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [ 5, 'Email must be at least 5 characters long' ],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
    },

  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);




// Hash password method
userSchema.methods.hashPassword = async function () {
    
    this.password = await bcrypt.hash(this.password, 10); // Hash the password
 
};

  
  
  userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };
  
  // Generate JWT token
  userSchema.methods.generateToken = function () {
    const payload = {
      id: this._id, // User's unique ID
      email: this.email
    };
  
    // Generate the token
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  };
  



const User=mongoose.model("User",userSchema);

module.exports=User;
