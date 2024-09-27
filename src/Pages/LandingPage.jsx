import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook for routing
import LandingNavbar from "../Components/LandingNavbar";
import SideBar from "../Components/sidebar";
import axios from "axios";
import _ from "lodash";  // Import lodash for trimming

const LandingPage = () => {
    const [invent, setInvent] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [research, setResearch] = useState([]);
    
    const navigate = useNavigate();  // Initialize the navigate hook

    useEffect(() => {
        // Fetch InventSpace data
        axios
            .get("http://localhost:3000/api/content/get-invent")
            .then((response) => {
                const limitedInvents = response.data.slice(0, 3);
                setInvent(limitedInvents);
            })
            .catch((error) => {
                console.error("Error fetching invents:", error);
            });
        // Fetch Requirements data
        axios
            .get("http://localhost:3000/api/content/get-requirements")
            .then((response) => {
                const limitedReq = response.data.slice(0, 3);
                setRequirements(limitedReq);
            })
            .catch((error) => {
                console.error("Error fetching requirements:", error);
            });
        // Fetch Research data
        axios
            .get("http://localhost:3000/api/content/get-research")
            .then((response) => {
                const limitedResearch = response.data.slice(0, 3);
                setResearch(limitedResearch);
            })
            .catch((error) => {
                console.error("Error fetching research:", error);
            });
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-800 font-poppins">
            <LandingNavbar />
            <div className="flex">
                <SideBar /> {/* Fixed width sidebar */}
                <div className="flex-grow flex flex-col justify-start mt-24 pl-[300px] pr-10">
                    {/* Main Card for Heading */}
                    <div className="bg-gray-900 rounded-2xl p-10 mb-12 shadow-lg w-full">
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
                        <div className="bg-gray-900 rounded-2xl p-8 shadow-md text-left flex-1 h-[449px]">
                            <h2
                                className="text-white text-2xl font-semibold mb-2 text-center mt-[-8px] cursor-pointer"
                                onClick={() => navigate("/qna")}
                            >
                                InventSpace
                            </h2>
                            <p
                                className="text-white text-base mb-2 text-center cursor-pointer"
                                onClick={() => navigate("/qna")}
                            >
                                Create and Innovate
                            </p>
                            <div className="space-y-6 mt-4">
                                {invent.map((item, index) => (
                                    <div key={index} className="bg-gray-700 p-8 rounded-lg shadow-sm w-[100%] mx-auto">
                                        <p className="text-white text-base font-medium">
                                            {_.truncate(item.title, { length: 21 })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Requirements Card */}
                        <div className="bg-gray-900 rounded-2xl p-8 shadow-md text-left flex-1 h-[449px]">
                            <h2
                                className="text-white text-2xl font-semibold mb-2 text-center mt-[-8px] cursor-pointer"
                                onClick={() => navigate("/requirements")}
                            >
                                Requirements
                            </h2>
                            <p
                                className="text-white text-base mb-2 text-center cursor-pointer"
                                onClick={() => navigate("/requirements")}
                            >
                                Organization help
                            </p>
                            <div className="space-y-6 mt-4">
                                {requirements.map((item, index) => (
                                    <div key={index} className="bg-gray-700 p-8 rounded-lg shadow-sm w-[100%] mx-auto">
                                        <p className="text-white text-base font-medium">
                                            {_.truncate(item.title, { length: 21 })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Research Card */}
                        <div className="bg-gray-900 rounded-2xl p-8 shadow-md text-left flex-1 h-[449px]">
                            <h2
                                className="text-white text-2xl font-semibold mb-2 text-center mt-[-8px] cursor-pointer"
                                onClick={() => navigate("/research")}
                            >
                                Research
                            </h2>
                            <p
                                className="text-white text-base mb-2 text-center cursor-pointer"
                                onClick={() => navigate("/research")}
                            >
                                Personalized research
                            </p>
                            <div className="space-y-6 mt-4">
                                {research.map((item, index) => (
                                    <div key={index} className="bg-gray-700 p-8 rounded-lg shadow-sm w-[100%] mx-auto">
                                        <p className="text-white text-base font-medium">
                                            {_.truncate(item.title, { length: 21 })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Communities Card */}
                        <div className="bg-gray-900 rounded-2xl p-8 shadow-md text-left flex-1 h-[449px]">
                            <h2
                                className="text-white text-2xl font-semibold mb-2 text-center mt-[-8px] cursor-pointer"
                                onClick={() => navigate("/communities")}
                            >
                                Top Communities
                            </h2>
                            <p
                                className="text-white text-base text-center cursor-pointer"
                                onClick={() => navigate("/communities")}
                            >
                                Join and Learn
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
