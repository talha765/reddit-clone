import './Index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage"; // Import the login page
import InventSpace from "./Pages/InventSpace";
import Requirements from "./Pages/Requirements";
import Communities from "./Pages/Communities";
import Research from "./Pages/Research";

const App = () => (
  <Router>
    <div className="flex flex-col h-screen">
    <Routes>
      <Route path='/' element={<HomePage />} /> 
      <Route path='/qna' element={<InventSpace />} /> 
      <Route path='/requirements' element={<Requirements />} /> 
      <Route path='/communities' element={<Communities />} /> 
      <Route path='/research' element={<Research />} /> 
      {/* <LandingPage /> */}
      {/* <LoginPage /> */}
    </Routes>
    </div>
  </Router>
);

export default App;
