const express =require("express");
const app=express();
require('dotenv').config()
const port=process.env.PORT;
const mongoose = require('mongoose');
const cors=require("cors");
const url=process.env.MONGO_URL;
const userRoutes=require("./routes/user.route");
const captainRoutes=require("./routes/captain.route");






main().then(()=>{
    console.log("connected to DB")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(url);

  
}

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.use("/users",userRoutes);
app.use("/captains",captainRoutes);




app.listen(port,()=>{
    console.log(`http://localhost/${port}`);

});