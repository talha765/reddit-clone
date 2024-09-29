import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './sidebar';
import LandingNavbar from './LandingNavbar';
import { useState, useEffect } from 'react';

const Layout = () => {
  const token = localStorage.getItem('token');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      // Close the sidebar if the screen width is less than or equal to 767px
      if (window.innerWidth <= 767) {
        setIsSidebarOpen(false); // Close sidebar on small screens
      } else {
        setIsSidebarOpen(true); // Open sidebar on larger screens
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on initial load to set the sidebar state correctly

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar on top */}
      {token ? <NavBar toggleSidebar={toggleSidebar} /> : <LandingNavbar />}

      <div className="flex flex-1">
        {/* Sidebar with conditional width and translation */}
        <div
          className={`fixed top-0 left-0 h-screen transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'
          }`}
        >
          <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main content area with dynamic width based on sidebar state */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {/* Overflow content so footer is pushed down if content is short */}
          <div className={`flex-1 overflow-y-auto p-6 bg-gray-800`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
