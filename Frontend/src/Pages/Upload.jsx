import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";   // ✅ missing import
import { logout } from "../utils/redux/slices/AuthSlice";

const Upload = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("video/")) {
      setFile(droppedFile);
    }
  };

  const handleBrowse = (e) => {
    const chosenFile = e.target.files[0];
    if (chosenFile && chosenFile.type.startsWith("video/")) {
      setFile(chosenFile);
    }
  };
  const logoutHandler = () => {
    dispatch(logout());  // state clear
  };

  return (
    <>
    <button 
      onClick={logoutHandler} 
      className="bg-red-500 px-5 py-2 font-bold text-white rounded-md"
    >
      Logout
    </button>
     <div className="min-h-screen bg-[#072c33] flex flex-col items-center justify-center">
      

      {/* Upload Box */}
      <div className="bg-[#004E5F] p-8 rounded-sm shadow-lg w-[90%] font-raleway max-w-xl mt-20">
        <h2 className="text-zinc-200 font-bold text-xl mb-2 ">UPLOAD YOUR VIDEO</h2>
        <p className="text-zinc-400 mb-6 ">
          Drop your video here or click browse to generate amazing captions instantly
        </p>

        <div
          className="  bg-secondary rounded-sm flex flex-col items-center justify-center h-56 cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
        >
          <div className="w-16 h-16 bg-cyan-400 rounded-full mb-4"></div>
          <p className="text-zinc-200 font-semibold">Drop YOUR VIDEO HERE</p>
          <p className="text-zinc-400 text-sm">or click to browse from your device</p>
          <button className="mt-4 px-6 py-2 bg-cyan-400 text-zinc-950 font-bold rounded-sm hover:bg-cyan-300">
            + Choose File
          </button>
          <input
            type="file"
            accept="video/*"
            ref={inputRef}
            onChange={handleBrowse}
            className="hidden"
          />
        </div>

        {file && (
          <p className="mt-4 text-cyan-300 text-sm">
            Selected File: <span className="font-semibold">{file.name}</span>
          </p>
        )}
      </div>
    </div>

    
    </>
  );
};

export default Upload;
