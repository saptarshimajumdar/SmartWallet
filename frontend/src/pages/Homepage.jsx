import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Welcome to SmartWallet</h2>
        <h2 className="text-base text-gray-600 font-semibold mb-10">Hassle-free payments app</h2>
        <div className="mb-4">
          <Link
            to="/signup"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

