import React from "react";
import logo from "../assets/react.svg"; // replace with your logo path

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-40 py-5 bg-white shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="highway delite" className="h-8 w-auto" />
        <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-800">Highway</h1>
            <p className="text-sm text-gray-800 font-bold">Delite</p>
        </div>
      </div>

      {/* Right: Search Bar */}
      <div className="flex gap-5 items-center">
        <input
          type="text"
          placeholder="Search"
          className="px-5 py-2 w-96 rounded-l-md bg-gray-100 text-sm outline-none border border-gray-200 focus:border-yellow-400"
        />
        <button className="px-5 py-2 bg-yellow-400 text-gray-800 font-medium rounded-lg hover:bg-yellow-500 transition">
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
