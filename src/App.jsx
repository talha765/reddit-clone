import './Index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from "./Components/LandingPage"
import HomePage from "./Components/HomePage"
const App = () => (
  <Router>
    <div className="flex flex-col h-screen">
       <HomePage />
      {/* <LandingPage /> */}
    </div>
  </Router>
);

export default App;
