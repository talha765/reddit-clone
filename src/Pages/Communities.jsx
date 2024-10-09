import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Communities = () => {
  const [topCommunities, setTopCommunities] = useState([]);
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();
  const api_route = import.meta.env.VITE_API_URL_CONTENT;

  // Handle navigating to CommunityPosts when a community is clicked
  const handleCommunityClick = (community) => {
    navigate(`/community/${community.id}`, { state: { community } });
  };

  // Fetch top communities on page load
  useEffect(() => {
    axios
      .get(`${api_route}/get-top-communities`)
      .then((response) => {
        const sortedByMemberCount = response.data.sort((a, b) => b.memberCount - a.memberCount);
        setTopCommunities(sortedByMemberCount.slice(0, 5));
      })
      .catch((error) => {
        console.error("Error fetching top communities:", error);
      });
  }, []);

  // Fetch all communities on page load
  useEffect(() => {
    axios
      .get(`${api_route}/get-communities`)
      .then((response) => {
        const sortedCommunities = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setCommunities(sortedCommunities);
      })
      .catch((error) => {
        console.error("Error fetching communities:", error);
      });
  }, []);

  return (
    <div className="p-4 bg-gray-800 min-h-screen" style={{ paddingTop: "80px" }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Communities</h1>
      </div>
      <div className="mb-5 pt-5 font-poppins pl-2">
        <p>Create world-class teams and share knowledge on projects and topics.</p>
      </div>

      {/* Top Communities */}
      <div>
        <h4 className="font-bold text-white mb-4">Top Communities</h4>
        <div className="flex flex-wrap justify-start gap-4">
          {topCommunities.map((community) => (
            <Card
              key={community.id}
              sx={{ width: { xs: "100%", sm: "calc(50% - 16px)", md: "200px" }, backgroundColor: "rgb(17 24 39)", color: "white" }}
              onClick={() => handleCommunityClick(community)} // Navigates to CommunityPosts
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {community.name}
                </Typography>
                <Typography gutterBottom sx={{ color: "white", fontSize: 14 }}>
                  {community.memberCount} members
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Communities */}
      <div>
        <h4 className="font-bold text-white mb-4 mt-8">All Communities</h4>
        <ul>
          {communities.map((community) => (
            <li key={community.id}>
              <a onClick={() => handleCommunityClick(community)} className="text-white hover:underline cursor-pointer">
                {community.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Communities;
