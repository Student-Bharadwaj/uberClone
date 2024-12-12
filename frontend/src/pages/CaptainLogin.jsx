import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setCaptainData({
      id: Date.now(),
      email: email,
      password: password,
    });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="px-4 py-6 h-screen w-full  flex flex-col justify-between">
      <div>
        <img
          width={100}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoJcsV2aZSkAm3nmwtyjuiekrT3H5U7pvjQ&s"
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
          join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-500 ">
            Register as captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="w-full inline-block text-center  bg-orange-400 text-white text-2xl font-medium rounded-md py-3"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
