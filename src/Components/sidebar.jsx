import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  ArrowLeftStartOnRectangleIcon
} from "@heroicons/react/24/outline";


const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      console.log("Logging out...");
      navigate('/landing'); // Redirect to landing page
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
        className={`
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          fixed top-0 left-0 h-screen w-64 bg-gradient-to-br from-gray-900 to-gray-800
          border-r border-white transition-transform duration-300 ease-in-out z-40 md:translate-x-0
          overflow-y-hidden hover:overflow-y-auto mt-7
        `}
      >
        <nav className="pt-9 p-3 h-full">
          <ul className="space-y-4">
            {/* Help Center (QnA) */}
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
                  Requirements
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
                <ClipboardDocumentCheckIcon className="w-5 h-5 text-white" />
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

            {/* Logout */}
            <li className="mt-4">
              <div className="flex items-center space-x-2">
                <ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-white" />
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 w-full hover:bg-gray-800 text-left cursor-pointer rounded-md flex justify-between items-center text-sm font-semibold text-white transition-colors duration-200 hover:text-red-600 focus:ring-gray-500"                >
                  Logout
                </button>
              </div>
            </li>
          </ul>
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
