import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";   // ✅ missing import
import { logout } from "../utils/redux/slices/AuthSlice";

const Upload = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());  // state clear
  };

  return (
    <button 
      onClick={logoutHandler} 
      className="bg-red-500 px-5 py-2 font-bold text-white rounded-md"
    >
      Logout
    </button>
  );
};

export default Upload;
