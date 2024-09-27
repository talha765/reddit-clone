import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingNavbar from "../Components/LandingNavbar";
import SideBar from "../Components/sidebar";

const App = () => (
    <div className="flex flex-col h-screen bg-gray-800 font-poppins">
        <LandingNavbar />
        <div className="flex">
            <SideBar /> {/* Fixed width sidebar */}
            <div className="flex-grow flex flex-col justify-start mt-24 pl-[300px] pr-10"> {/* Added padding-left and padding-right */}
                {/* Main Card for Heading */}
                <div className="bg-gray-900 rounded-2xl p-10 mb-12 shadow-lg w-full"> {/* Changed to rounded-2xl */}
                    <h1 className="text-white text-4xl font-bold mb-4">
                        WELCOME TO STUDENT RESEARCH LAB!
                    </h1>
                    <p className="text-3xl text-stone-300">
                        Invent, Discuss And Innovate
                    </p>
                </div>

                {/* Cards Section */}
                <div className="flex justify-between gap-6"> 
                    {/* InventSpace Card */}
                    <div className="bg-gray-900 rounded-2xl p-8 shadow-md text-left flex-1"> {/* Changed to rounded-2xl */}
                        <h2 className="text-white text-xl font-semibold mb-2">InventSpace</h2>
                        <p className="text-white text-sm">Student Discussions</p>
                    </div>
                    {/* Requirements Card */}
                    <div className="bg-gray-900 rounded-2xl p-8 shadow-md text-left flex-1"> {/* Changed to rounded-2xl */}
                        <h2 className="text-white text-xl font-semibold mb-2">Requirements</h2>
                        <p className="text-white text-sm">Organization help</p>
                    </div>
                    {/* Research Card */}
                    <div className="bg-gray-900 rounded-2xl p-8 shadow-md text-left flex-1"> {/* Changed to rounded-2xl */}
                        <h2 className="text-white text-xl font-semibold mb-2">Research</h2>
                        <p className="text-white text-sm">Personalized research</p>
                    </div>
                    {/* Top Communities Card */}
                    <div className="bg-gray-900 rounded-2xl p-8 shadow-md text-left flex-1"> {/* Changed to rounded-2xl */}
                        <h2 className="text-white text-xl font-semibold mb-2">Top Communities</h2>
                        <p className="text-white text-sm">12345 users</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default App;
