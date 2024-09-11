import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, HomeIcon, QuestionMarkCircleIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

// Dummy components for the pages
const QnA = () => <div><h2>QnA Page</h2></div>;
const Requirements = () => <div><h2>Requirements Page</h2></div>;

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Button to toggle sidebar for small screens */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 text-white bg-gray-800 rounded-md focus:outline-none">
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:translate-x-0 transform bg-gray-900 text-white h-screen w-60 top-0 left-0 transition-transform duration-300 ease-in-out z-40 sidebar-scrollbar`}>
        <nav className="p-4 h-full">
          <ul className="space-y-4">
            {/* Home Link */}
            <li className="flex items-center space-x-2">
              <HomeIcon className="w-6 h-6" />
              <Link
                to="/"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
                Home
              </Link>
            </li>

            {/* QnA Links */}
            {Array.from({ length: 10 }, (_, index) => (
              <li key={index} className="flex items-center space-x-2">
                <QuestionMarkCircleIcon className="w-6 h-6" />
                <Link
                  to="/qna"
                  className="block py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
                  QnA Item {index + 1}
                </Link>
              </li>
            ))}

            {/* Requirements Links */}
            {Array.from({ length: 10 }, (_, index) => (
              <li key={index + 10} className="flex items-center space-x-2">
                <ClipboardDocumentCheckIcon className="w-6 h-6" />
                <Link
                  to="/requirements"
                  className="block py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
                  Requirements Item {index + 1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 bg-gray-100 min-h-screen md:ml-60 overflow-y-auto">
        <Routes>
          <Route path="/qna" element={<QnA />} />
          <Route path="/requirements" element={<Requirements />} />
        </Routes>
      </div>
    </div>
  );
};

export default SideBar;