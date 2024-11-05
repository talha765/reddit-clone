import React, { useState, useEffect } from 'react';
import logo from '../assets/backpack.png';
import { 
  MagnifyingGlassIcon, 
  UserIcon, 
  BellIcon, 
  ChatBubbleOvalLeftEllipsisIcon, 
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const api_route = import.meta.env.VITE_API_URL_AUTH;

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchUserData(token);
    } else {
      setIsLoading(false); // No token means no user data
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(`${api_route}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchInput.trim()) {
        navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
        setSearchInput("");
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('id');
    Cookies.remove('type');
    console.log("Logging out...");
    navigate("/");
    window.location.reload();
  };

  const handleUserIconClick = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full flex items-center bg-gray-900 p-3 z-50 border-b border-gray-300">
        <div className="flex items-center mx-4">
          <img src={logo} className="w-10 h-10" alt="Logo" />
          <button className="ml-2 text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Bars3Icon className="w-8 h-8" />
          </button>
        </div>

        <form className="relative flex items-center bg-gray-600 rounded-2xl flex-grow mx-4" onSubmit={handleSearch}>
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

        <div className="flex items-center ml-auto">
          {user ? (
            <>
              <button
                className="relative mx-2 mr-5 bg-transparent focus:outline-none hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-900 p-2 rounded-full"
                onClick={handleUserIconClick}
              >
                <UserIcon className="w-7 h-7 text-white" />
                {showDropdown && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-lg z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center p-3 border-b border-gray-700">
                      <h3 className="text-white font-bold">User Info</h3>
                      <button onClick={() => setShowDropdown(false)} className="p-1">
                        <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-gray-200" />
                      </button>
                    </div>
                    <div className="py-3 px-4 text-sm text-gray-300">
                      {isLoading ? (
                        <p>Loading user data...</p>
                      ) : (
                        <>
                          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                          <p><strong>Username:</strong> {user.username}</p>
                          <p><strong>Type:</strong> {user.type}</p>
                          <button
                            onClick={() => navigate(`/user-posts/${user.id}`)}
                            className="mt-4 w-full py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-md"
                          >
                            Your Posts
                          </button>
                          <button
                            onClick={handleLogout}
                            className="mt-4 w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded-md"
                          >
                            Logout
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </button>
            </>
          ) : (
            <div className="hidden md:flex items-center space-x-4 ml-auto">
              <Link to="/signup">
                <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration=200 ease-in-out">Login</button>
              </Link>
            </div>
          )}
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
            <button className="text-white hover:bg-gray-700 w-full text-left p-2" onClick={()=> navigate("/homepage")}>Home</button>
            <button className="text-white hover:bg-gray-700 w-full text-left p-2" onClick={()=> navigate("/qna")}>InventSpaces</button>
            <button className="text-white hover:bg-gray-700 w-full text-left p-2" onClick={()=> navigate("/requirements")} >Requirements</button>
            <button className="text-white hover:bg-gray-700 w-full text-left p-2" onClick={()=> navigate("/communities")}>Community</button>
            <button className="text-white hover:bg-gray-700 w-full text-left p-2" onClick={()=> navigate("/research")}>Research</button>
            <button className="text-white hover:bg-gray-700 w-full text-left p-2" onClick={()=> navigate("/LnD")}>Learning and Development</button>
            <button className="text-white hover:bg-gray-700 w-full text-left p-2" onClick={()=> navigate("/about")}>AboutUs</button>
            {user ? (
              <>
                {/* Additional links for logged-in users */}
                <button className="text-red-600 hover:bg-red-500 w-full text-left p-2" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                {/* Links for non logged-in users */}
            <button className="text-green-400 hover:bg-gray-700 w-full text-left p-2" onClick={() => navigate("/login")}>Login</button>
            <button className="text-green-400 hover:bg-gray-700 w-full text-left p-2" onClick={() => navigate("/signup")}>Sign Up</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;