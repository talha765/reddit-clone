import React, { useState } from 'react';
import logo from '../assets/backpack.png';
import { 
  MagnifyingGlassIcon, 
  UserIcon, 
  BellIcon, 
  ChatBubbleOvalLeftEllipsisIcon, 
  XMarkIcon,
  Bars3Icon // Import hamburger menu icon
} from '@heroicons/react/24/outline'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const api_route = import.meta.env.VITE_API_URL_CONTENT;

  const handleUserIconClick = async () => {
    setShowDropdown((prev) => !prev);
    if (!showDropdown) {
      try {
        const token = Cookies.get('token');

        if (!token) {
          console.log("No token found. Please log in.");
          return;
        }
        const response = await axios.get(`${api_route}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    }
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
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
    navigate('/landing');
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full flex items-center bg-gray-900 p-3 z-50 border-b border-gray-300">
        <div className="flex items-center mx-4">
          <img src={logo} className="w-10 h-10" alt="Logo" />
          <button className="ml-2 text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Bars3Icon className="w-8 h-8" /> {/* Hamburger Icon */}
          </button>
        </div>
        
        {/* Search bar (always visible) */}
        <form className="relative flex items-center bg-gray-600 rounded-2xl flex-grow mx-4">
          <input
            type="text"
            className="bg-gray-600 h-10 w-full text-white pl-10 pr-3 rounded-2xl"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearch}
          />
          <MagnifyingGlassIcon className="absolute left-3 w-6 h-6 text-white" />
        </form>

        <div className="flex items-center">
          {/* <button className="ml-10 mr-5 mx-2 bg-transparent focus:outline-none hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-900 p-2 rounded-full">
            <BellIcon className='w-7 h-7 text-white' />
          </button> */}
          <button className="mx-2 mr-5 bg-transparent focus:outline-none hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-900 p-2 rounded-full">
            <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7 text-white" />
          </button>
          <button
            className="relative mx-2 mr-5 bg-transparent focus:outline-none hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-900 p-2 rounded-full"
            onClick={handleUserIconClick}
          >
            <UserIcon className="w-7 h-7 text-white" />
            {showDropdown && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-lg z-50"
                onClick={handleDropdownClick}
              >
                <div className="flex justify-between items-center p-3 border-b border-gray-700">
                  <h3 className="text-white font-bold">User Info</h3>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation();
                      setShowDropdown(false);
                    }} 
                    className="p-1"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-gray-200" />
                  </button>
                </div>
                <div className="py-3 px-4 text-sm text-gray-300">
                  {isLoading ? (
                    <p>Loading user data...</p>
                  ) : user ? (
                    <div>
                      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                      <div className="my-4" />
                      <p><strong>Username:</strong> {user.username}</p>
                      <div className="my-4" />
                      <p><strong>Type:</strong> {user.type}</p>
                    </div>
                  ) : (
                    <p>User not logged in or no data found.</p>
                  )}
                  <button
                    onClick={handleLogout}
                    className="mt-4 w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-90 flex flex-col">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-white">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)}>
              <XMarkIcon className="w-8 h-8 text-white" />
            </button>
          </div>

          {/* Menu options */}
          <div className="flex flex-col items-start mx-4">
            <button className="text-white hover:bg-gray-700 w-full text-left p-2" onClick={()=> navigate("/qna")}>InventSpaces</button>
            <button className="text-white hover:bg-gray-700 w-full text-left p-2" onClick={()=> navigate("/requirements")} >Requirements</button>
            <button className="text-white hover:bg-gray-700 w-full text-left p-2" onClick={()=> navigate("/communities")}>Community</button>
            <button className="text-white hover:bg-gray-700 w-full text-left p-2" onClick={()=> navigate("/research")}>Research</button>
            <button className="text-white hover:bg-gray-700 w-full text-left p-2" onClick={()=> navigate("/about")}>AboutUs</button>
            <button className="text-red-600 hover:bg-red-500 w-full text-left p-2" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
