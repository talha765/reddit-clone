import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PostCard from "../Components/PostCard"; // Assuming you have a PostCard component
import { useNavigate } from "react-router-dom";

const api_route = import.meta.env.VITE_API_URL_CONTENT;

const SearchResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState({
    inventspace: [],
    requirements: [],
    research: [],
    community: [],
  });
  const location = useLocation();

  // Extract search query from URL
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `${api_route}/search?query=${encodeURIComponent(query)}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div
      className="p-4 bg-gray-800 min-h-screen"
      style={{ paddingTop: "80px" }}
    >
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

      {results.inventspace && results.inventspace.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-5">InventSpace</h2>
          <ul>
            {results.inventspace.map((item) => (
              <PostCard
                handleClick={() =>
                  navigate(`/invent-post/${item.id}`, { state: { post: item } })
                }
                key={item.id}
                post={item}
              />
            ))}
          </ul>
        </>
      )}

      {results.requirements && results.requirements.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-5">Requirements</h2>
          <ul>
            {results.requirements.map((item) => (
              <PostCard
                handleClick={() =>
                  navigate(`/requirement-post/${item.id}`, {
                    state: { post: item },
                  })
                }
                key={item.id}
                post={item}
              />
            ))}
          </ul>
        </>
      )}

      {results.research && results.research.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-5">Research</h2>
          <ul>
            {results.research.map((item) => (
              <PostCard
                handleClick={() =>
                  navigate(`/research-post/${item.id}`, {
                    state: { post: item },
                  })
                }
                key={item.id}
                post={item}
              />
            ))}
          </ul>
        </>
      )}

{results.community && results.community.length > 0 && (
  <>
    <h2 className="text-xl font-semibold mb-5">Community posts</h2>
    <ul>
      {results.community.map((item) => (
        <li key={item.id}> {/* Add a wrapping <li> tag */}
          <h2>{item.community.name}</h2>
          <PostCard
            handleClick={() =>
              navigate(`/community/${item.communityId}/post/${item.id}`, {
                state: { post: item },
              })
            }
            post={item}
          />
        </li>
      ))}
    </ul>
  </>
)}


      {!results.inventspace?.length &&
        !results.requirements?.length &&
        !results.research?.length &&
        !results.community?.length &&  
        <p>No results found.</p>}
    </div>
  );
};

export default SearchResults;
