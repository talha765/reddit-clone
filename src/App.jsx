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
import AboutUsPage from "./Pages/AboutUs";
import SearchResults from "./Pages/SearchResults";
import CommunityPosts from "./pages/CommunityPosts";
import Invent_Page from "./Pages/InventSpacePage";
import Requirement_Page from "./Pages/RequirementPage";
import Research_Page from "./Pages/ResearchPage";
import CommunityPage from "./Pages/CommunityPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/landing" element={<LandingPage />} />

      {/* Define the routes that will use the shared Layout */}
      <Route element={<Layout />}>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/qna" element={<InventSpace />} />
        <Route path="/requirements" element={<Requirements />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/research" element={<Research />} />
        <Route path="/about" element={<AboutUsPage />} />

        {/* Nested Routes for Community and Posts */}
        <Route path="/community/:communityId" element={<CommunityPosts />} />
        <Route path="/community/:communityId/post/:postId" element={<CommunityPage />} />

        {/* Additional Post Routes */}
        <Route path="/invent-post/:postId" element={<Invent_Page />} />
        <Route path="/requirement-post/:postId" element={<Requirement_Page />} />
        <Route path="/research-post/:postId" element={<Research_Page />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
