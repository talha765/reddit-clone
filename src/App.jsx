import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from "./Components/sidebar";
import NavBar from "./Components/NavBar";

const App = () => (
  <Router>
    <div className="flex flex-col h-screen">
      <NavBar />
      <SideBar />
    </div>
  </Router>
);

export default App;
