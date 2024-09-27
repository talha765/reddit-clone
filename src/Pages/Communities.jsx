import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


const Communities = () => {
  const [topCommunities, setTopCommunities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/content/get-communities")
      .then((response) => {
        //logic for top communities use member count
        setTopCommunities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  console.log("top communities: ", topCommunities);
  return (
    <div
      className="p-4 bg-gray-800 min-h-screen"
      style={{ paddingTop: "80px" }}
    >
      {/* Add New Post Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Communities</h1>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Top Communities</h4>
        <div className="flex justify-between ">
          { topCommunities.map((community) => (
            <Card sx={{ width: 200, backgroundColor: "#D3D3D3" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {community.name}
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                {community.memberCount} members
              </Typography>
            </CardContent>
          </Card>
          
          ))}
        </div>
      </div>
    </div>
  );
};

export default Communities;
