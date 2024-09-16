import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './sidebar';

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar with fixed width */}
      <div className="w-64 flex-shrink-0">
        <SideBar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar on top */}
        <NavBar />

        {/* Page content area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-800">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
