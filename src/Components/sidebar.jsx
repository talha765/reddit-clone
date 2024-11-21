import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  ArrowLeftOnRectangleIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  ExclamationCircleIcon,
  PencilSquareIcon,
  UserGroupIcon 
} from "@heroicons/react/24/outline";
import Cookies from 'js-cookie';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get('token'); // Check for token here

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    try {
      Cookies.remove('token');
      Cookies.remove('id');
      Cookies.remove('type');
      console.log("Logging out...");
      navigate("/"); // Redirect to the root directory
  
      // Reload the page to ensure all components re-render for non-logged-in view
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="relative flex">
      {/* Button to toggle sidebar for small screens */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 text-white bg-gray-700 rounded-full shadow-lg hover:bg-gray-600 transition-colors focus:outline-none"
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-screen md:w-56 lg:w-64 bg-gradient-to-br from-gray-900 to-gray-800
          border-r border-white transition-transform duration-300 ease-in-out z-40 md:translate-x-0
          overflow-y-hidden hover:overflow-y-auto mt-7`}
      >
        <nav className="pt-9 p-3 h-full relative">
          <ul className="space-y-3">
            {/* Help Center (QnA) */}
            <li className="mt-6">
              <div className="flex items-center space-x-2">
                <HomeIcon className="w-5 h-5 text-white" />
                <Link
                  to="/homepage"
                  className="py-1 px-4 w-full text-left hover:bg-gray-800 cursor-pointer rounded-md flex justify-between items-center text-sm font-semibold text-white transition-colors duration-200 focus:ring-gray-500"
                >
                  Home
                </Link>
              </div>
            </li>

            {/* Divider (White Line) */}
            <li>
              <hr className="border-t border-white border-opacity-20" />
            </li>

            <li className="mt-6">
              <div className="flex items-center space-x-2">
                <QuestionMarkCircleIcon className="w-5 h-5 text-white" />
                <Link
                  to="/qna"
                  className="py-2 px-4 w-full text-left hover:bg-gray-800 cursor-pointer rounded-md flex justify-between items-center text-sm font-semibold text-white transition-colors duration-200 focus:ring-gray-500"
                >
                  InventSpace
                </Link>
              </div>
            </li>

            {/* Divider (White Line) */}
            <li>
              <hr className="border-t border-white border-opacity-20" />
            </li>

            {/* Requirements */}
            <li className="mt-4">
              <div className="flex items-center space-x-2">
                <ClipboardDocumentCheckIcon className="w-5 h-5 text-white" />
                <Link
                  to="/requirements"
                  className="py-2 px-4 w-full text-left hover:bg-gray-800 cursor-pointer rounded-md flex justify-between items-center text-sm font-semibold text-white transition-colors duration-200 focus:ring-gray-500"
                >
                  Requirements & Co Ops
                </Link>
              </div>
            </li>

            {/* Divider (White Line) */}
            <li>
              <hr className="border-t border-white border-opacity-20" />
            </li>

            {/* Communities */}
            <li className="mt-4">
              <div className="flex items-center space-x-2">
                <UserGroupIcon  className="w-5 h-5 text-white" />
                <Link
                  to="/communities"
                  className="py-2 px-4 w-full text-left hover:bg-gray-800 cursor-pointer rounded-md flex justify-between items-center text-sm font-semibold text-white transition-colors duration-200 focus:ring-gray-500"
                >
                  Communities
                </Link>
              </div>
            </li>

            {/* Divider (White Line) */}
            <li>
              <hr className="border-t border-white border-opacity-20" />
            </li>

            {/* Research */}
            <li className="mt-4">
              <div className="flex items-center space-x-2">
                <AcademicCapIcon className="w-5 h-5 text-white" />
                <Link
                  to="/research"
                  className="py-2 px-4 w-full text-left hover:bg-gray-800 cursor-pointer rounded-md flex justify-between items-center text-sm font-semibold text-white transition-colors duration-200 focus:ring-gray-500"
                >
                  Research
                </Link>
              </div>
            </li>

            {/* Divider (White Line) */}
            <li>
              <hr className="border-t border-white border-opacity-20" />
            </li>

            {/* Research */}
            <li className="mt-4">
              <div className="flex items-center space-x-2">
                <PencilSquareIcon className="w-5 h-5 text-white" />
                <Link
                  to="/LnD"
                  className="py-2 px-4 w-full text-left hover:bg-gray-800 cursor-pointer rounded-md flex justify-between items-center text-sm font-semibold text-white transition-colors duration-200 focus:ring-gray-500"
                >
                  Workshops and Competitive events
                </Link>
              </div>
            </li>

            {/* Divider (White Line) */}
            <li>
              <hr className="border-t border-white border-opacity-20" />
            </li>

            {/* About Us */}
            <li className="mt-4">
              <div className="flex items-center space-x-2">
                <InformationCircleIcon className="w-5 h-5 text-white" />
                <Link
                  to="/about"
                  className="py-2 px-4 w-full text-left hover:bg-gray-800 cursor-pointer rounded-md flex justify-between items-center text-sm font-semibold text-white transition-colors duration-200 focus:ring-gray-500"
                >
                  About Us
                </Link>
              </div>
            </li>

            {/* Divider (White Line) */}
       
              <hr className="border-t border-white border-opacity-20" />
         
          </ul>

          <div className="mt-4">
              <div className="flex items-center space-x-2">
            <ExclamationCircleIcon className="mt-1 h-5 w-5 " />
               <p className="text-white">This is the beta version</p>
              </div>
            </div>

          
          {/* Logout (Bottom-right) */}
          {token && ( // Only display if the token exists
            <div className="absolute bottom-5 left-0 w-full px-4 ">
              <div className="flex items-center space-x-2 ">
                <ArrowLeftOnRectangleIcon className="w-5 h-5 text-white mb-4 " />
                <button
                  onClick={handleLogout}
                  className=" py-2 px-4 mb-5 w-full hover:bg-gray-800 text-left cursor-pointer rounded-md flex justify-between items-center text-sm font-semibold text-white transition-colors duration-200 hover:text-red-600 "
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 ${
          isOpen ? "ml-64" : "ml-0"
        } transition-all duration-300 ease-in-out`}
      >
        {/* Your main content here */}
      </div>
    </div>
  );
};

export default SideBar;