import './Index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Requirements from './Pages/Requirements';
import Communities from './Pages/Communities';
import Research from './Pages/Research';
import InventSpace from './Pages/InventSpace';
import Layout from './Components/Layout'; // Import the Layout component

const App = () => (
  <Router>
    <Routes>
      {/* Define the routes that will use the shared Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/qna" element={<InventSpace />} />
        <Route path="/requirements" element={<Requirements />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/research" element={<Research />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
