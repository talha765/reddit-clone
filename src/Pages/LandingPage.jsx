import { BrowserRouter as Router } from 'react-router-dom';
import LandingNavbar from "../Components/LandingNavbar";

const App = () => (
    <div className="flex flex-col h-screen bg-gray-900 font-poppins">
        <LandingNavbar />

        <main className="flex-grow flex flex-col items-center justify-center px-4 ">
            <h1 className="text-white text-4xl font-semibold text-center mb-8">
                Solution that can produce great results
            </h1>
            
            <p className="text-white text-medium text-center max-w-4xl">
                Student's creativity and innovation can pay off without experience, get recognized while at school.
            </p>
        </main>
    </div>
);

export default App;