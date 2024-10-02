import React, { useState } from "react";
import logo from "../assets/backpack.png";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Icons for mobile menu
import Cookies from 'js-cookie';

const NavBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchInput.trim()) {
        navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('id');
    Cookies.remove('type');
    console.log("Logging out...");
    navigate("/landing");
  };

  return (
    <header className="fixed top-0 left-0 w-full flex items-center bg-gray-900 p-3 z-50 border-b border-gray-300">
      {/* Logo */}
      <div className="flex items-center mx-4">
        <img src={logo} className="w-10 h-10" alt="Logo" />
        {/* Hamburger Menu for mobile */}
        <button
          className="ml-2 text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Bars3Icon className="w-8 h-8" /> {/* Hamburger Icon */}
        </button>
      </div>

      {/* Search Bar - Always visible */}
      <form
        className="relative flex items-center bg-gray-600 rounded-2xl flex-grow mx-4"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="bg-gray-600 h-10 w-full text-white pl-10 pr-3 rounded-2xl placeholder:text-sm md:placeholder:text-base"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearch}
        />
        <svg
          className="absolute left-3 w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18 18l-4.35-4.35"
          />
        </svg>
      </form>

      {/* Sign Up and Login Buttons - Hidden on small screens */}
      <div className="hidden md:flex items-center space-x-4 ml-auto">
        <Link to="/signup">
          <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out">
            Login
          </button>
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-90 flex flex-col items-start p-4 md:hidden">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-white">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)}>
              <XMarkIcon className="w-8 h-8 text-white" />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col items-start w-full">
            <button
              className="text-white hover:bg-gray-700 w-full text-left p-2"
              onClick={() => navigate("/qna")}
            >
              InventSpaces
            </button>
            <button
              className="text-white hover:bg-gray-700 w-full text-left p-2"
              onClick={() => navigate("/requirements")}
            >
              Requirements
            </button>
            <button
              className="text-white hover:bg-gray-700 w-full text-left p-2"
              onClick={() => navigate("/communities")}
            >
              Community
            </button>
            <button
              className="text-white hover:bg-gray-700 w-full text-left p-2"
              onClick={() => navigate("/research")}
            >
              Research
            </button>
            <button
              className="text-white hover:bg-gray-700 w-full text-left p-2"
              onClick={() => navigate("/about")}
            >
              AboutUs
            </button>
            <button
              className="text-red-600 hover:bg-red-500 w-full text-left p-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
