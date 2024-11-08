import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const api_route_content = import.meta.env.VITE_API_URL_CONTENT;
const api_route_user = import.meta.env.VITE_API_URL_AUTH;

const LnD = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [fileError, setFileError] = useState("");
  const [userType, setUserType] = useState("");
  const userId = Cookies.get("id");
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
    location: "",
    limit: "",
    image: "",
  });

  // Fetch user type to verify permissions
  const fetchUserType = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) return;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`${api_route_user}/user`, config);
      setUserType(response.data.type);
    } catch (error) {
      console.error("Error fetching user type:", error);
    }
  };

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${api_route_content}/lnd`);
      setEvents(response.data); // Assume response.data is an array of LnD events
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchUserType();
    fetchEvents();
  }, []);

  const openAddEventModal = () => {
    if (userType === "Admin") setShowAddEventModal(true);
  };

  const closeAddEventModal = () => {
    setShowAddEventModal(false);
    setFileError("");
    setNewEvent({
      title: "",
      date: "",
      description: "",
      location: "",
      limit: "",
      image: "",
    });
  };

  // Handle file upload and convert to Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml"];
      if (!allowedTypes.includes(file.type)) {
        setFileError("Only PNG, JPG, and SVG files are allowed.");
        e.target.value = null;
      } else {
        setFileError("");
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewEvent((prevState) => ({
            ...prevState,
            image: reader.result.split(",")[1],
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({ ...prevState, [name]: value }));
  };

  // Submit new event to backend
  const handleAddPost = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) return;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(`${api_route_content}/lnd`, newEvent, config);
      setEvents([...events, newEvent]);
      closeAddEventModal();
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Handle applying to an event
  const handleApply = async (lndId) => {
    try {
      const token = Cookies.get("token");
      if (!token) return;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(
        `${api_route_content}/lnd/${lndId}/apply`,
        { userId },
        config
      );
      setEvents(
        events.map((event) =>
          event.id === lndId ? { ...event, applied: true } : event
        )
      );
      alert("Applied successfully!");
    } catch (error) {
      console.error("Error applying to event:", error);
      alert("Could not apply. Please try again.");
    }
  };

  return (
    <div
      className="p-4 bg-gray-800 min-h-screen"
      style={{ paddingTop: "80px" }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          Our Learning & Development (LnD) Events
        </h1>
        {userType === "Admin" && (
          <button
            className="flex items-center bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
            onClick={openAddEventModal}
          >
            <FaPlus className="mr-2" /> Add Event
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-lg shadow-md border border-gray-600 p-4 flex flex-col justify-between"
          >
            {event.image ? (
              <div
                className="overflow-hidden rounded-lg cursor-pointer"
                onClick={() => navigate(`/lnd/${event.id}`)} // Navigate to event details on click
              >
                <img
                  src={`data:image/png;base64,${event.image.replace(
                    /^data:image\/(png|jpeg|jpg|svg\+xml);base64,/,
                    ""
                  )}`}
                  alt={event.title}
                  className="h-full w-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
            ) : (
              <div
                className="h-full w-full bg-gray-700 flex items-center justify-center text-gray-400 cursor-pointer"
                onClick={() => navigate(`/lnd/${event.id}`)}
              >
                No Image Available
              </div>
            )}

            <div className="text-white">
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-400 text-sm mb-2">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-400 text-sm mb-2">
                Location: {event.location}
              </p>
              <p className="text-gray-300 mb-4">{event.description}</p>
              <p className="text-gray-400 text-sm mb-4">Limit: {event.limit}</p>
            </div>
            <button
              className={`mt-4 py-2 px-4 rounded-lg ${
                event.applied
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500"
              } text-white`}
              onClick={() => !event.applied && handleApply(event.id)}
              disabled={event.applied}
            >
              {event.applied ? "Applied" : "Apply"}
            </button>
          </div>
        ))}
      </div>

    {/* Other Events Module */}
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white mt-10">
          Other Learning and Development Events
        </h1>
        {userType === "Admin" && (
          <button
            className="flex items-center bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
            onClick={openAddEventModal}
          >
            <FaPlus className="mr-2" /> Add Event
          </button>
        )}
      </div> */}

      {showAddEventModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg">
            <h2 className="text-lg text-white font-bold mb-4">Add New Event</h2>
            <form className="space-y-4">
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full px-4 py-3 bg-gray-700 rounded-full text-white"
              />
              <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 rounded-full text-white"
              />
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white h-24"
              ></textarea>
              <input
                type="text"
                name="location"
                value={newEvent.location}
                onChange={handleInputChange}
                placeholder="Location/Address"
                className="w-full px-4 py-3 bg-gray-700 rounded-full text-white"
              />
              <input
                type="number"
                name="limit"
                value={newEvent.limit}
                onChange={handleInputChange}
                placeholder="Limit"
                className="w-full px-4 py-3 bg-gray-700 rounded-full text-white"
              />
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .svg"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-gray-700 rounded-full text-white"
              />
              {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={handleAddPost}
                >
                  Add Post
                </button>
                <button
                  type="button"
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg"
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
