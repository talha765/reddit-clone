import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api_route_content = import.meta.env.VITE_API_URL_CONTENT;

const LnD = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [fileError, setFileError] = useState("");
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        description: "",
        location: "",
        limit: "",
        image: ""
    });

    useEffect(() => {
        fetchEvents();
    }, [page]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${api_route_content}/get-events?page=${page}`);
            const newEvents = response.data.events;
            if (newEvents.length === 0) {
                setHasMore(false);
            } else {
                setEvents((prevEvents) => [...prevEvents, ...newEvents]);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const openAddEventModal = () => {
        setShowAddEventModal(true);
    };

    const closeAddEventModal = () => {
        setShowAddEventModal(false);
        setFileError(""); // Reset file error on close
        setNewEvent({
            title: "",
            date: "",
            description: "",
            location: "",
            limit: "",
            image: ""
        }); // Reset form fields
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml"];
            if (!allowedTypes.includes(file.type)) {
                setFileError("Only PNG, JPG, and SVG files are allowed.");
                e.target.value = null; // Clear the file input
            } else {
                setFileError("");
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewEvent((prevState) => ({ ...prevState, image: reader.result }));
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleAddPost = () => {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        closeAddEventModal();
    };

    return (
        <div className="p-4 bg-gray-800 min-h-screen" style={{ paddingTop: "80px", overflow: "hidden" }}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Learning & Development (LnD)</h1>
                <button
                    className="flex items-center bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out"
                    onClick={openAddEventModal}
                >
                    <FaPlus className="mr-2" /> Add Event
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="h-80 w-80 bg-gray-900 rounded-lg shadow-md border border-gray-600 transition duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-700 flex items-center justify-center"
                        onClick={() => navigate(`/lnd-event/${event.id}`, { state: { event } })}
                    >
                        {event.image ? (
                            <img
                                src={event.image}
                                alt={event.title}
                                className="h-full w-full object-cover rounded-lg"
                            />
                        ) : (
                            <div className="h-full w-full bg-gray-700 flex items-center justify-center text-gray-400">
                                Event Content Here
                            </div>
                        )}
                    </div>
                ))}
            </div>



            {showAddEventModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg">
                        <h2 className="text-lg text-white font-bold mb-4">Add New Event</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleInputChange}
                                    placeholder="Title"
                                    className="w-full px-4 py-3 bg-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="date"
                                    name="date"
                                    value={newEvent.date}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <textarea
                                name="description"
                                value={newEvent.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                            ></textarea>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="location"
                                    value={newEvent.location}
                                    onChange={handleInputChange}
                                    placeholder="Location/Address"
                                    className="w-full px-4 py-3 bg-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    name="limit"
                                    value={newEvent.limit}
                                    onChange={handleInputChange}
                                    placeholder="Limit (int)"
                                    className="w-full px-4 py-3 bg-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg, .svg"
                                onChange={handleFileChange}
                                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    type="button"
                                    onClick={handleAddPost}
                                    className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out"
                                >
                                    Add Post
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out"
                                    onClick={closeAddEventModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LnD;
