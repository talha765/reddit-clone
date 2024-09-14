import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [qnaOpen, setQnaOpen] = useState(true);
  const [requirementsOpen, setRequirementsOpen] = useState(false);
  const [communitiesOpen, setCommunitiesOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleQnA = () => {
    setQnaOpen(!qnaOpen);
  };

  const toggleRequirements = () => {
    setRequirementsOpen(!requirementsOpen);
  };

  const toggleCommunities = () => {
    setCommunitiesOpen(!communitiesOpen);
  };

  const toggleResearch = () => {
    setResearchOpen(!researchOpen);
  };

  return (
    <div className="relative flex">
      {/* Button to toggle sidebar for small screens */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 text-white bg-gray-700 rounded-full shadow-lg hover:bg-gray-600 transition-colors focus:outline-none"
        >
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed top-0 left-0 h-screen w-64 bg-gradient-to-br from-gray-900 to-gray-800
          border-r border-white transition-transform duration-300 ease-in-out z-40 md:translate-x-0
          overflow-y-hidden hover:overflow-y-auto
        `}
      >
        <nav className="pt-9 p-3 h-full">
          <ul className="space-y-4">
            {/* Help Center (QnA) Dropdown */}
            <li className="mt-6">
              <div className="flex items-center justify-between">
                <div className="mt-8 flex items-center space-x-2">
                  <QuestionMarkCircleIcon className="w-5 h-5 text-white" />
                  <button
                    onClick={toggleQnA}
                    className="py-2 px-4 w-full text-left hover:bg-gray-800 cursor-pointer rounded-md flex justify-between items-center text-sm font-semibold text-white transition-colors duration-200 focus:ring-gray-500"
                  >
                    InventSpace
                    {qnaOpen ? <ChevronUpIcon className="w-4 h-4 ml-2" /> : <ChevronDownIcon className="w-4 h-4 ml-2" />}
                  </button>
                </div>
              </div>

              {qnaOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <li key={index}>
                      <Link
                        to="/qna"
                        className="block py-1 px-2 pl-5 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 focus:ring-gray-500"
                      >
                        FAQ {index + 1}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Divider (White Line) */}
            <li>
              <hr className="border-t border-white border-opacity-20" />
            </li>

            {/* Requirements Dropdown */}
            <li className="mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ClipboardDocumentCheckIcon className="w-5 h-5 text-white" />
                  <button
                    onClick={toggleRequirements}
                    className="py-2 px-4 w-full text-left hover:bg-gray-800 cursor-pointer rounded-md flex justify-between items-center text-sm font-semibold text-white transition-colors duration-200 focus:ring-gray-500"
                  >
                    Requirements
                    {requirementsOpen ? <ChevronUpIcon className="w-4 h-4 ml-2" /> : <ChevronDownIcon className="w-4 h-4 ml-2" />}
                  </button>
                </div>
              </div>

              {requirementsOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <li key={index}>
                      <Link
                        to="/requirements"
                        className="block py-1 px-2 pl-5 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 focus:ring-gray-500"
                      >
                        Requirements {index + 1}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Divider (White Line) */}
            <li>
              <hr className="border-t border-white border-opacity-20" />
            </li>

            {/* Communities Dropdown */}
            <li className="mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ClipboardDocumentCheckIcon className="w-5 h-5 text-white" />
                  <button
                    onClick={toggleCommunities}
                    className="py-2 px-4 w-full text-left hover:bg-gray-800 cursor-pointer rounded-md flex justify-between items-center text-sm font-semibold text-white transition-colors duration-200 focus:ring-gray-500"
                  >
                    Communities
                    {communitiesOpen ? <ChevronUpIcon className="w-4 h-4 ml-2" /> : <ChevronDownIcon className="w-4 h-4 ml-2" />}
                  </button>
                </div>
              </div>

              {communitiesOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <li key={index}>
                      <Link
                        to="/communities"
                        className="block py-1 px-2 pl-5 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 focus:ring-gray-500"
                      >
                        Community {index + 1}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Divider (White Line) */}
            <li>
              <hr className="border-t border-white border-opacity-20" />
            </li>

            {/* Research Dropdown */}
            <li className="mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AcademicCapIcon className="w-5 h-5 text-white" />
                  <button
                    onClick={toggleResearch}
                    className="py-2 px-4 w-full text-left hover:bg-gray-800 cursor-pointer rounded-md flex justify-between items-center text-sm font-semibold text-white transition-colors duration-200 focus:ring-gray-500"
                  >
                    Research
                    {researchOpen ? <ChevronUpIcon className="w-4 h-4 ml-2" /> : <ChevronDownIcon className="w-4 h-4 ml-2" />}
                  </button>
                </div>
              </div>

              {researchOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <li key={index}>
                      <Link
                        to="/research"
                        className="block py-1 px-2 pl-5 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 focus:ring-gray-500"
                      >
                        Research {index + 1}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className={`flex-1 ${isOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out`}>
        {/* Your main content here */}
      </div>
    </div>
  );
};

export default SideBar;
