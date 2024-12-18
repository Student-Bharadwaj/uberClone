import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const {user,setUser} =useContext(UserDataContext);
  const navigate=useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();

    setUserData({
     
      email: email,
      password: password,
    });

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData);
    const data=response.data;
    setUser({
      fullname:{
        firstname:data.user.fullname.firstname,
        lastname:data.user.fullname.lastname
      },
      email:data.user.email,
    });
    localStorage.setItem("token",data.token);
    navigate("/user-hero");


    setEmail("");
    setPassword("");
  };

  return (
    <div className="px-4 py-6 h-screen w-full  flex flex-col justify-between">
      <div>
        <img
          width={130}
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt="uber"
        />
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="ml-1"
        >
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
            Login
          </button>
        </form>
        <p className="text-xl mt-4 text-center font-medium">
          New here?{" "}
          <Link to="/signup" className="text-blue-500 ">
           Create an account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="w-full inline-block text-center  bg-green-600 text-white text-2xl font-medium rounded-md py-3"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
