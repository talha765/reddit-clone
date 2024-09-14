import { Outlet } from 'react-router-dom';
import NavBar from './NavBar'; // Adjust based on the actual file location
import SideBar from './sidebar'; // Adjust based on the actual file location

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar with fixed width */}
      <SideBar className="w-64 flex-shrink-0" />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar on top */}
        <NavBar />

        {/* Page content area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
