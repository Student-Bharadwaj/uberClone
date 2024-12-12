import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainSignup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [captainData,setCaptainData]=useState({});
  
  
    const handleSubmit=(e)=>{
      e.preventDefault();
  setCaptainData({
    fullName:{
      firstname:firstname,
      lastname:lastname
    },
    email:email,
    password:password
  });
//   console.log(captainData)
  setEmail("");
  setPassword("");
  setFirstname("");
  setLastname("");
  
    }

  return (
    <div className="px-4 py-6 h-screen w-full  flex flex-col justify-between">
    <div>
      <img
        width={100}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoJcsV2aZSkAm3nmwtyjuiekrT3H5U7pvjQ&s"
        
        alt="uber"
      />
      <form
      onSubmit={(e)=>{handleSubmit(e)}}
      
       className="ml-1">
        <h1 className="text-2xl font-medium mt-4 ">what's your Name</h1>
        <div className=" w-full flex gap-2">
          <input
            className="text-base w-full border mt-2 bg-slate-200 pl-2  py-2 "
            type="text"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            required
            placeholder="First name"
          />
          <input
            className="text-base w-full border mt-2 bg-slate-200 pl-2  py-2 "
            type="text"
            value={lastname}
            onChange={(e) => {
             setLastname(e.target.value);
            }}

            placeholder="Last name"
          />
        </div>

        <h1 className="text-2xl font-medium mt-4 ">what's your Email</h1>
        <input
          className="text-base w-full border mt-2 bg-slate-200 pl-2  py-2 "
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          placeholder="example@123.com"
        />

        <h1 className="text-2xl font-medium mt-6 ">Enter Password</h1>
        <input
          className="text-base w-full border mt-2 bg-slate-200 pl-2 py-2 "
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          placeholder="Password"
        />

        <button className=" bg-black mt-6 w-full text-white py-3 rounded-lg text-2xl font-medium">
          Sign up
        </button>
      </form>
      <p className="text-lg mt-4 text-center  font-medium">
        have an account?{" "}
        <Link to="/captain-login" className="text-blue-500 ">
        Login as captain
        </Link>
      </p>
    </div>
    <div>
      
      <p className="text-sm text-slate-500 leading-4   ">
        privacy policy Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Dolore nesciunt incidunt ea aliquam voluptates vero earum
        distinctio quae voluptas consequatur.
      </p>
    </div>
  </div>
  )
}

export default CaptainSignup