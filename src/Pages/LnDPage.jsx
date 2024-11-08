import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaUser } from "react-icons/fa";

const api_route_content = import.meta.env.VITE_API_URL_CONTENT;
const api_route_user = import.meta.env.VITE_API_URL_AUTH;

const LndEventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [userType, setUserType] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const userId = Cookies.get("id");

  useEffect(() => {
    fetchUserType();
  }, [id]);

  useEffect(() => {
    if (userType && userId) {
      fetchEventDetails();
    }
  }, [userType, userId]);
  
  

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

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`${api_route_content}/lnd/${id}`);
      setEvent(response.data);

      // If user is admin, fetch the list of applicants
      if (userType === "Admin") {
        fetchApplicants();
      } else if (userId) {
        // If user is not admin, check application status
        checkApplicationStatus();
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(`${api_route_content}/lnd/${id}/applicants`);
      setApplicants(response.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const checkApplicationStatus = async () => {
    try {
      const response = await axios.get(`${api_route_content}/user/${userId}/applications`);
      setHasApplied(response.data.some(app => app.lndId === parseInt(id)));
    } catch (error) {
      console.error("Error checking application status:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(`${api_route_content}/lnd/${id}/apply`, { userId }, config);
      setHasApplied(true);
      alert("Registration successful!");
      fetchEventDetails(); // Refresh event details if necessary
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("Failed to register. Please try again.");
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 p-4" style={{ paddingTop: "80px" }}>
      <button
        onClick={() => navigate("/lnd")}
        className="flex items-center text-white mb-6 hover:text-gray-300"
      >
        <FaArrowLeft className="mr-2" /> Back to Events
      </button>

      {userType === "Admin" ? (
        // Admin view: Display table of registered applicants
        <div className="max-w-6xl mx-auto bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-white mb-4">Registered Applicants</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white rounded-lg">
            <thead>
  <tr>
    <th className="text-left px-7 py-2 border-b border-gray-600">Username</th>
    <th className="text-left px-4 py-2 border-b border-gray-600">Email</th>
    <th className="text-left px-4 py-2 border-b border-gray-600">Status</th>
  </tr>
</thead>

              <tbody>
                {applicants.length > 0 ? (
                  applicants.map((applicants) => (
                    <tr key={applicants.id} className="hover:bg-gray-700">
                      <td className="px-4 py-2 border-b border-gray-600">{applicants.user.username}</td>
                      <td className="px-4 py-2 border-b border-gray-600"> {applicants.user.email}</td>
                      <td className="px-4 py-2 border-b border-gray-600 text-green-400">Applied</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-400">
                      No applicants yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // Non-admin view: Display event details with registration button
        <div className="max-w-6xl mx-auto bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-white mb-4">{event.title}</h1>
          {event.image && (
            <div className="w-full h-96 flex items-center justify-center overflow-hidden rounded-lg mb-4 bg-gray-800">
              <img src={event.image} alt={event.title} className="max-w-full max-h-full object-contain" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                <span>Date: {new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>Location: {event.location}</span>
              </div>
              <div className="flex items-center">
                <FaUsers className="mr-2" />
                <span>Participant Limit: {event.limit}</span>
              </div>
              <div className="flex items-center">
                <FaUser className="mr-2" />
                <span>Current Registrations: {event.registrationCount || 0}</span>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
              <p className="text-gray-300 whitespace-pre-wrap">{event.description}</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleRegister}
              disabled={hasApplied || event.registrationCount >= event.limit}
              className={`w-full py-3 rounded-lg text-white font-medium ${
                hasApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : event.registrationCount >= event.limit
                  ? "bg-red-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500"
              }`}
            >
              {hasApplied
                ? "Already Registered"
                : event.registrationCount >= event.limit
                ? "Event Full"
                : "Register Now"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LndEventDetails;
