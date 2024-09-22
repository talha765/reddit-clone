import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import LandingNavbar from "../Components/LandingNavbar";
import SideBar from "../Components/sidebar";
import InventSpace from './InventSpace';
const App = () => (
    <div className="flex flex-col h-screen bg-gray-900 font-poppins">
        <LandingNavbar />
         <SideBar />
        <main className="flex-grow flex flex-col items-center justify-center px-4 ml-20 pl-20">
            <h1 className="text-white text-4xl font-semibold text-center mb-8 ml-10">
                Solution that can produce great results
            </h1>
            
            <p className="text-white text-medium text-center max-w-4xl pl-12">
                Student's creativity and innovation can pay off without experience, get recognized while at school.
            </p>
        </main>

    </div>
);

export default App;