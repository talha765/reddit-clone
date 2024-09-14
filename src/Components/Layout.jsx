// Layout.jsx
import React from 'react';
import NavBar from './NavBar';  // Import NavBar
import SideBar from './sidebar';  // Import SideBar

const Layout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar remains on the left */}
      <SideBar />
      
      {/* Main content area */}
      <div className="flex-1">
        {/* Navbar remains at the top */}
        <NavBar />
        {/* Render the page content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
