import './Index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./Components/LandingPage";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage"; // Import the login page

const App = () => (
  <Router>
    <div className="flex flex-col h-screen">
       {/* <HomePage /> */}
      <LandingPage />
    </div>
  </Router>
);

export default App;
