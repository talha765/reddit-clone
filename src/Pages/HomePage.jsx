import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import ResizeObserver from "resize-observer-polyfill";
import Cookies from "js-cookie";

const api_route = import.meta.env.VITE_API_URL_CONTENT;

const DynamicTruncateText = ({ text }) => {
  const [truncateLength, setTruncateLength] = useState(21); // Default truncate length
  const containerRef = useRef(null);

  useEffect(() => {
    const adjustTruncateLength = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;

        // Adjust length based on container width (customize values as needed)
        const newLength =
          containerWidth > 600 ? 50 : containerWidth > 400 ? 30 : 21;
        setTruncateLength(newLength);
      }
    };

    // Create a ResizeObserver to detect size changes
    const resizeObserver = new ResizeObserver(adjustTruncateLength);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup on component unmount
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <p
      ref={containerRef}
      className="text-white text-sm md:text-base font-medium"
    >
      {_.truncate(text, { length: truncateLength })}
    </p>
  );
};

const HomePage = () => {
  const [invent, setInvent] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [research, setResearch] = useState([]);
  const [comPosts, setComPosts] = useState([]);
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  // Fetch LnD events for news ticker
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${api_route}/lnd`);
        const eventData = response.data.map((event) => ({
          id: event.id,
          title: event.title,
          date: new Date(event.date).toLocaleDateString(), // Format the date for display
        }));
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    axios
      .get(`${api_route}/get-invent`)
      .then((response) => {
        const limitedInvents = response.data.slice(0, 7);
        setInvent(limitedInvents);
      })
      .catch((error) => {
        console.error("Error fetching invents:", error);
      });

    axios
      .get(`${api_route}/get-requirements`)
      .then((response) => {
        const limitedReq = response.data.slice(0, 7);
        setRequirements(limitedReq);
      })
      .catch((error) => {
        console.error("Error fetching requirements:", error);
      });

    axios
      .get(`${api_route}/get-research`)
      .then((response) => {
        const limitedResearch = response.data.slice(0, 7);
        setResearch(limitedResearch);
      })
      .catch((error) => {
        console.error("Error fetching research:", error);
      });

    axios
      .get(`${api_route}/get-communities-posts`)
      .then((response) => {
        const topCommunityPosts = response.data;
        setComPosts(topCommunityPosts);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  // Handle click to navigate to the specific event page
  const handleEventClick = (id) => {
    navigate(`/lnd/${id}`);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-800 font-poppins">
      {/* News Ticker Row */}
      <div className="bg-gray-900 text-teal-300 p-2 text-center mt-14 w-full ">
        <marquee
          behavior="scroll"
          direction="left"
          className="text-s"
          scrollamount="10"
        >
          🚨 WELCOME TO STUDENT RESEARCH LABS 🚨 Upcomming Events:
          {events.length > 0
            ? events.map((event, index) => (
                <span
                  key={event.id}
                  onClick={() => handleEventClick(event.id)}
                  className="cursor-pointer hover:underline mx-4"
                >
                  | {event.title} - {event.date}
                  {index < events.length - 1 && " | "}{" "}
                  {/* Add separator between items */}
                </span>
              ))
            : "  (Loading events...)  "}
          🚨 Invent, Discuss And Innovate 🚨
        </marquee>
      </div>

      <div className="flex flex-col md:flex-row ">
        <div className="flex-grow flex flex-col justify-start mt-0 p-4 md:pl-10 md:pr-10">
          <div className="bg-gray-900 rounded-2xl p-10 mb-12 shadow-lg w-full">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
              WELCOME TO STUDENT RESEARCH LAB!
            </h1>
            <p className="md:text-2xl text-stone-300">
              Invent, Discuss And Innovate - Student's creativity can be a
              powerful asset, independent of experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 xl:grid-rows-2">
            <div className="bg-gray-900 rounded-2xl p-8 shadow-md flex-1 h-[28rem]">
              <h2
                className="text-white text-xl md:text-2xl font-semibold mb-2 text-center cursor-pointer"
                onClick={() => navigate("/qna")}
              >
                InventSpace
              </h2>
              <p
                className="text-white text-sm md:text-base mb-2 text-center cursor-pointer"
                onClick={() => navigate("/qna")}
              >
                Create and Innovate
              </p>
              <div className="space-y-6 mt-4 overflow-y-auto h-[18rem] scrollbar-hide">
                {invent.map((item, index) => (
                  <div
                    onClick={() =>
                      navigate(`/invent-post/${item.id}`, {
                        state: { post: item },
                      })
                    }
                    key={index}
                    className="bg-gray-700 p-4 md:p-8 rounded-lg shadow-sm mx-auto w-full hover:bg-gray-600 hover:scale-105 transform transition-transform duration-300"
                  >
                    <DynamicTruncateText text={item.title} />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-7 shadow-md flex-1 h-[28rem]">
              <h2
                className="text-white text-xl md:text-2xl font-semibold mb-2 text-center cursor-pointer"
                onClick={() => navigate("/requirements")}
              >
                Requirements & Co Ops
              </h2>
              <p
                className="text-white text-sm md:text-base mb-2 text-center cursor-pointer"
                onClick={() => navigate("/requirements")}
              >
                Organization help
              </p>
              <div className="space-y-6 mt-4 overflow-y-auto h-[18rem] scrollbar-hide">
                {requirements.map((item, index) => (
                  <div
                    onClick={() =>
                      navigate(`/requirement-post/${item.id}`, {
                        state: { post: item },
                      })
                    }
                    key={index}
                    className="bg-gray-700 p-4 md:p-8 rounded-lg shadow-sm mx-auto w-full hover:bg-gray-600 hover:scale-105 transform transition-transform duration-300"
                  >
                    <DynamicTruncateText text={item.title} />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 shadow-md flex-1 h-[28rem] xl:row-start-2">
              <h2
                className="text-white text-xl md:text-2xl font-semibold mb-2 text-center cursor-pointer"
                onClick={() => navigate("/research")}
              >
                Research
              </h2>
              <p
                className="text-white text-sm md:text-base mb-2 text-center cursor-pointer"
                onClick={() => navigate("/research")}
              >
                Personalized research
              </p>
              <div className="space-y-6 mt-4 overflow-y-auto h-[18rem] scrollbar-hide">
                {research.map((item, index) => (
                  <div
                    onClick={() =>
                      navigate(`/research-post/${item.id}`, {
                        state: { post: item },
                      })
                    }
                    key={index}
                    className="bg-gray-700 p-4 md:p-8 rounded-lg shadow-sm mx-auto w-full hover:bg-gray-600 hover:scale-105 transform transition-transform duration-300"
                  >
                    <DynamicTruncateText text={item.title} />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 shadow-md flex-1 h-[28rem] xl:row-start-2">
              <h2
                className="text-white text-xl md:text-2xl font-semibold mb-2 text-center cursor-pointer"
                onClick={() => navigate("/communities")}
              >
                Community and Blogs
              </h2>
              <p
                className="text-white text-sm md:text-base mb-2 text-center cursor-pointer"
                onClick={() => navigate("/communities")}
              >
                Student communities
              </p>
              <div className="space-y-6 mt-4 overflow-y-auto h-[18rem] scrollbar-hide">
                {comPosts.map((item, index) => (
                  <div
                    onClick={() =>
                      navigate(
                        `/community/${item.communityId}/post/${item.id}`,
                        { state: { post: item } }
                      )
                    }
                    key={index}
                    className="bg-gray-700 flex justify-between p-4 md:p-8 rounded-lg shadow-sm mx-auto w-full hover:bg-gray-600 hover:scale-105 transform transition-transform duration-300"
                  >
                    <DynamicTruncateText text={item.title} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
