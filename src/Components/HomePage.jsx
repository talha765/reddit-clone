import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from "./NavBar";
import SideBar from './sidebar';

const App = () => (
  
    <div className="bg-gray-900 font-poppins">
      <NavBar />
      <SideBar />
    </div>

);

export default App;
