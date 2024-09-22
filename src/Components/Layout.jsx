import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './sidebar';
import LandingNavbar from './LandingNavbar';

const Layout = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar on top */}
      {token ? <NavBar /> : <LandingNavbar />}

      <div className="flex flex-1">
        {/* Sidebar with fixed width */}
        <div className="w-64 flex-shrink-0">
          <SideBar />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Overflow content so footer is pushed down if content is short */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-800">
            <Outlet />
          </div>
        </div>
      </div>
</div>
);
  
};

export default Layout;

