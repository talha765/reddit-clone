import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [results, setResults] = useState({
    inventspace: [],
    requirements: [],
    research: [],
  });
  const location = useLocation();

  // Extract search query from URL
  const query = new URLSearchParams(location.search).get("query");
  console.log(query)
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/content/search?query=${encodeURIComponent(query)}`
        );
        console.log(response);
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

      {results.inventspace?.length > 0 && (
        <>
          <h2 className="text-xl font-semibold">InventSpace</h2>
          <ul>
            {results.inventspace.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </>
      )}

      {results.requirements?.length > 0 && (
        <>
          <h2 className="text-xl font-semibold">Requirements</h2>
          <ul>
            {results.requirements.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </>
      )}

      {results.research?.length > 0 && (
        <>
          <h2 className="text-xl font-semibold">Research</h2>
          <ul>
            {results.research.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </>
      )}

      {results.inventspace?.length === 0 &&
        results.requirements?.length === 0 &&
        results.research?.length === 0 && <p>No results found.</p>}
    </div>
  );
};

export default SearchResults;
