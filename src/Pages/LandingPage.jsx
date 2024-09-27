import { useState, useEffect } from "react";
import LandingNavbar from "../Components/LandingNavbar";
import SideBar from "../Components/sidebar";
import axios from "axios";
import _ from "lodash";  // Import lodash for trimming

const LandingPage = () => {
    const [invent, setInvent] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [research, setResearch] = useState([]);


    useEffect(() => {
        axios
          .get("http://localhost:3000/api/content/get-invent")
          .then((response) => {
            // Limit to 3 posts only
            const limitedInvents = response.data.slice(0, 3);
            setInvent(limitedInvents);
          })
          .catch((error) => {
            console.error("Error fetching invents:", error);
          });
          axios
          .get("http://localhost:3000/api/content/get-requirements")
          .then((response) => {
            // Limit to 3 posts only
            const limitedReq = response.data.slice(0, 3);
            setRequirements(limitedReq);
          })
          .catch((error) => {
            console.error("Error fetching invents:", error);
          });
          axios
          .get("http://localhost:3000/api/content/get-research")
          .then((response) => {
            // Limit to 3 posts only
            const limitedResearch = response.data.slice(0, 3);
            setResearch(limitedResearch);
          })
          .catch((error) => {
            console.error("Error fetching invents:", error);
          });
      }, []);

    return(
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
                        <p className="text-white text-sm mb-2">Create and Innovate</p>
                        <div className="space-y-4">
                            {invent.map((item, index) => (
                                <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-sm">
                                    <p className="text-white text-sm font-medium">
                                        {_.truncate(item.title, { 'length': 20 })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requirements Card */}
                    <div className="bg-gray-900 rounded-2xl p-8 shadow-md text-left flex-1">
                        <h2 className="text-white text-xl font-semibold mb-2">Requirements</h2>
                        <p className="text-white text-sm mb-2">Organization help</p>
                        <div className="space-y-4">
                            {requirements.map((item, index) => (
                                <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-sm">
                                    <p className="text-white text-sm font-medium">
                                        {_.truncate(item.title, { 'length': 20 })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Research Card */}
                    <div className="bg-gray-900 rounded-2xl p-8 shadow-md text-left flex-1">
                        <h2 className="text-white text-xl font-semibold mb-2">Research</h2>
                        <p className="text-white text-sm mb-2">Personalized research</p>
                        <div className="space-y-4">
                            {research.map((item, index) => (
                                <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-sm">
                                    <p className="text-white text-sm font-medium">
                                        {_.truncate(item.title, { 'length': 20 })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Communities Card */}
                    <div className="bg-gray-900 rounded-2xl p-8 shadow-md text-left flex-1">
                        <h2 className="text-white text-xl font-semibold mb-2">Top Communities</h2>
                        <p className="text-white text-sm">12345 users</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default LandingPage;
