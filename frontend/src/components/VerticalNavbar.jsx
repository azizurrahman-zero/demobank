import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/Actions";
import { useNavigate } from "react-router-dom";

const VerticalNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };
  return (
    <div className="w-40 flex flex-col items-center justify-between min-h-[calc(100vh-24px)] mr-5 shadow-2xl rounded-tr-lg rounded-br-lg bg-gradient-to-b p-5 my-3 from-indigo-100 via-indigo-200 to-indigo-300">
      <div className="flex flex-col space-y-6 w-full">
        {/* Navigation Links */}
        <Link
          className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 px-4 py-2 font-bold rounded-md text-center transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md font-medium text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 transition duration-300 transform hover:scale-105 focus:outline-none"
          to="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 px-4 py-2 font-bold rounded-md text-center transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md font-medium text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 transition duration-300 transform hover:scale-105 focus:outline-none"
          to="/account-settings"
        >
          Settings
        </Link>
        <Link
          className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 px-4 py-2 font-bold rounded-md text-center transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md font-medium text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 transition duration-300 transform hover:scale-105 focus:outline-none"
          to="/comment"
        >
          Comments
        </Link>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 mt-4 rounded-md text-center bg-red-600 hover:bg-red-500 text-white font-bold transition-all duration-300 ease-in-out transform hover:scale-110 shadow-lg"
      >
        Log Out
      </button>
    </div>
  );
};

export default VerticalNavbar;
