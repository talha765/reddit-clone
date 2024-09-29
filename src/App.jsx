import "./Index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Requirements from "./Pages/Requirements";
import Communities from "./Pages/Communities";
import Research from "./Pages/Research";
import InventSpace from "./Pages/InventSpace";
import LoginPage from "./Pages/LoginPage";
import Layout from "./Components/Layout"; // Import the Layout component
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignUp";
import LandingPage from "./Pages/LandingPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import AboutUsPage from "./Pages/AboutUs";
import SearchResults from "./Pages/SearchResults";

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/landing" element={<LandingPage />} />

      {/* Define the routes that will use the shared Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<AboutUsPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path="/qna" element={<InventSpace />} />
        <Route path="/requirements" element={<Requirements />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/research" element={<Research />} />
        <Route path="/about" element={<AboutUsPage />} />


        {/* Add a new route for post detail */}
      </Route>
    </Routes>
  </Router>
);

export default App;
