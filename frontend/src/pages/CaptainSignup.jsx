import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [captainData, setCaptainData] = useState({});

  const {captain,setCaptain}=useContext(CaptainDataContext);
const navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setCaptainData({
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    });
console.log(captainData);
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData);
    console.log(response);
      // const data=response.data;
      // console.log(data);
      // setCaptain(data.captain);
      // localStorage.setItem("token",data.token);
      
      // navigate("/captain-hero")


    

      // console.log(captainData)
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleType("");
    setVehicleCapacity("");
  };

  return (
    <div className="px-4 py-4 h-screen w-full  flex flex-col justify-between">
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
          {/* vehicle */}
          <h1 className="text-2xl font-medium mt-6 ">Vehicle</h1>
          <div className="flex flex-wrap justify-center gap-2 ">
            <input
              className="text-base w-[48%] border mt-2 bg-slate-200 pl-2 py-2 "
              type="text"
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
              required
              placeholder="color"
            />
            <input
              className="text-base w-[48%] border mt-2 bg-slate-200 pl-2 py-2 "
              type="text"
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
              required
              placeholder="Plate number"
            />
            <input
              className="text-base w-[48%] border mt-2 bg-slate-200 pl-2 py-2 "
              type="number"
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
              required
              placeholder="capacity"
            />

            <select
              className="text-base w-[48%] border mt-2 bg-slate-200 pl-2 py-2 "
              required
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option name="auto" value="auto">
                auto
              </option>
              <option name="car" value="car">
                car
              </option>
              <option name="motorcycle" value="motorcycle">
                motorcycle
              </option>
            </select>
          </div>

          <button className=" bg-black mt-6 w-full text-white py-3 rounded-lg text-2xl font-medium">
            Create Captain account
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
        <p className="text-sm text-slate-500 leading-4   "></p>
      </div>
    </div>
  );
};

export default CaptainSignup;
