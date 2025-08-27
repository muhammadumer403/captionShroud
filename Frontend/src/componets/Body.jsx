import React from "react";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 ">
      <Outlet />
    </div>
  );
};

export default Body;
