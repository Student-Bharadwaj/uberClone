import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1708315432956-44a059e52d07?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full  flex flex-col justify-between ">
      <img
        className="mt-4 ml-4 "
        width={80}
        src="https://freelogopng.com/images/all_img/1659761297uber-icon.png"
        alt="uber"
      />
      <div className="w-full px-4 py-4 text-center bg-white flex flex-col ">
        <p className="m-4 text-3xl font-semibold">Get started with Uber</p>
        <Link
          to="/login"
          className="m-4 bg-black text-white py-3 rounded-lg text-lg font-medium"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};
export default Home;
