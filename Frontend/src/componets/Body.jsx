import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 ">
      <Navbar/>
      <Outlet />
    </div>
  );
};

export default Body;
