import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';

const Communities = () => {
  const [topCommunities, setTopCommunities] = useState([]);
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  const handleCommunityClick = (communityId) => {
    navigate(`/community/${communityId}`)
  };

  // Fetch top communities
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/content/get-top-communities")
      .then((response) => {
        // Logic for top communities, sorted by member count
        console.log("API Response:", response.data); // Check the response structure
        const unfilteredCommunities = response.data;

        // Sort all communities by memberCount in descending order
        const sortedByMemberCount = unfilteredCommunities.sort((a, b) => b.memberCount - a.memberCount);
        
        // Set the top 5 communities
        setTopCommunities(sortedByMemberCount.slice(0, 5));
      })
      .catch((error) => {
        console.error("Error fetching top communities:", error);
      });
  }, []);

  // Fetch all communities and sort them alphabetically
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/content/get-communities")
      .then((response) => {
        // Sort communities alphabetically by name
        const sortedCommunities = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCommunities(sortedCommunities);
      })
      .catch((error) => {
        console.error("Error fetching communities:", error);
      });
  }, []);

  console.log("top communities: ", topCommunities);
  console.log("all communities: ", communities);

  return (
    <div className="p-4 bg-gray-800 min-h-screen" style={{ paddingTop: "80px" }}>
      {/* Add New Post Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Communities</h1>
      </div>

      {/* Top Communities */}
      <div>
      <h4 className="font-bold text-white mb-4">Top Communities</h4>
      <div className="flex justify-between">
        {topCommunities.map((community) => (
          <Card
            sx={{ width: 200, backgroundColor: "rgb(17 24 39)", color: "white"}}
            onClick={() => handleCommunityClick(community.id)} // Navigate to community posts page
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
              <a onClick={() => handleCommunityClick(community.id)} className="text-white hover:underline">
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
