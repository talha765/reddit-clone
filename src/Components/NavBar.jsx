import React, { useState } from 'react';
import logo from '../assets/backpack.png';
import { MagnifyingGlassIcon, UserIcon, BellIcon, ChatBubbleOvalLeftEllipsisIcon, XMarkIcon } from '@heroicons/react/24/outline'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleUserIconClick = async () => {
    setShowDropdown((prev) => !prev);
    if (!showDropdown) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log("No token found. Please log in.");
          return;
        }
        const response = await axios.get('http://localhost:3000/api/auth/user', {
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
        // Redirect to search results page and pass the search query
        navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    console.log("Logging out...");
    navigate('/landing'); // Redirect to landing page
  };

  // Stop event bubbling to avoid unwanted behavior
  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full flex items-center bg-gray-900 p-3 z-50 border-b border-gray-300">
        <div className="mx-4">
          <img src={logo} className="w-10 h-10 mr-20" alt="Logo" />
        </div>
        <form className="relative flex items-center bg-gray-600 rounded-2xl flex-grow mx-4 ml-20 mr-20">
          <input
            type="text"
            className="bg-gray-600 h-10 w-full text-white pl-10 pr-3 rounded-2xl"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => {setSearchInput(e.target.value)}}
            onKeyDown={handleSearch}  // Trigger search on pressing Enter
          />
          <MagnifyingGlassIcon className="absolute left-3 w-6 h-6 text-white" />
          
        </form>
        <button className="ml-10 mr-5 mx-2 bg-transparent focus:outline-none hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-900 p-2 rounded-full">
          <BellIcon className='w-7 h-7 text-white' />
        </button>
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
              onClick={handleDropdownClick}  // Stop event propagation here
            >
              <div className="flex justify-between items-center p-3 border-b border-gray-700">
                <h3 className="text-white font-bold">User Info</h3>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); // Stop event bubbling
                    setShowDropdown(false); // Close the dropdown
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
      </header>
    </>
  );
};

export default NavBar;
