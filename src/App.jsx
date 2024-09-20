import './Index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Requirements from './Pages/Requirements';
import Communities from './Pages/Communities';
import Research from './Pages/Research';
import InventSpace from './Pages/InventSpace';
import LoginPage from './Pages/LoginPage';
import Layout from './Components/Layout'; // Import the Layout component
import HomePage from './Pages/HomePage';
import SignupPage from './Pages/SignUp';
import LandingPage from './Pages/LandingPage';
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => (

  <Router>
    <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/landing" element={<LandingPage />} />

      {/* Define the routes that will use the shared Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<ProtectedRoute component={HomePage} />} />
        <Route path='/homepage' element={<ProtectedRoute component={HomePage} />} />
        <Route path="/qna" element={<ProtectedRoute component={InventSpace} />} />
        <Route path="/requirements" element={<ProtectedRoute component={Requirements} />} />
        <Route path="/communities" element={<ProtectedRoute component={Communities} />} />
        <Route path="/research" element={<ProtectedRoute component={Research} />} />

        {/* Add a new route for post detail */}
      </Route>
    </Routes>
  </Router>
);

export default App;
