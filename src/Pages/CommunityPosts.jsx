import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaCommentAlt, FaPlus } from "react-icons/fa";
import Cookies from 'js-cookie';
import { Filter } from "bad-words";

const api_route = "http://localhost:3000/api/content";


const CommunityPosts = () => {
  const userId = Cookies.get('id');
  const { communityId } = useParams(); // Get community ID from URL
  const [posts, setPosts] = useState([]);
  const [communityDetails, setCommunityDetails] = useState({});
  const [showAddPostModal, setShowAddPostModal] = useState(false); // Modal state for new post
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [newPostForm, setNewPostForm] = useState({});

  // Fetch posts for the specific community
  useEffect(() => {
    axios
      .get(
        `${api_route}/get-posts-by-community/${communityId}`
      )
      .then((response) => {
        setPosts(response.data.posts);
        setCommunityDetails(response.data.community); // Also fetch community details
      })
      .catch((error) => {
        console.error("Error fetching community posts:", error);
      });
  }, [communityId]);

  const handleOpenAddPostModal = () => {
    if (!userId) {
      setShowLoginModal(true);
    } else {
      setShowAddPostModal(true);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        `${api_route}/postlike/${postId}`,
        { userId }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes:
                  response.data.message === "Liked"
                    ? post.likes + 1
                    : post.likes - 1,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCloseAddPostModal = () => {
    setShowAddPostModal(false);
    setShowLoginModal(false);
  };

  const handleAddPost = () => {
    const filter = new Filter();
    if (newPostForm.title && newPostForm.description) {
      if (
        filter.isProfane(newPostForm.title) ||
        filter.isProfane(newPostForm.content)
      ) {
        alert("Your post contains inappropriate language. Please remove it.");
        return;
      }
      axios
        .post(
          `${api_route}/post-in-community/${communityId}/${userId}`,
          newPostForm
        )
        .then((response) => {
          setPosts([...posts, response.data]); // Add new post to the list
          setShowAddPostModal(false); // Close the modal
        })
        .catch((error) => {
          console.error("Error adding post:", error);
        });
    }
  };

  return (
    <div
      className="p-4 bg-gray-800 min-h-screen"
      style={{ paddingTop: "80px" }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          {communityDetails.name}
        </h1>
        <button
          className="flex items-center bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out"
          onClick={handleOpenAddPostModal} // Open modal on click
        >
          <FaPlus className="mr-2" /> Add Post
        </button>
      </div>

      {posts.map((post) => (
        <div
          key={post.id}
          className="mb-6 p-4 bg-gray-900 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold text-white">{post.title}</h2>
          <p className="mt-2 text-white">{post.description}</p>
          <div className="mt-4 flex items-center justify-between text-white">
            <div className="flex">
              <div className="mr-4 flex items-center">
                <FaThumbsUp
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(post.id);
                  }}
                />
                <span className="text-white ml-2">{post.likes}</span>
              </div>
              {/* <span className="flex items-center">
                <FaCommentAlt className="mr-1" /> {post.comments.length}
              </span> */}
            </div>
            <button className="text-white underline">View Post</button>
          </div>
        </div>
      ))}

      {/* Add Post Modal */}
      {showAddPostModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-3xl">
            <h2 className="text-lg text-white font-bold mb-4">Add New Post</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddPost();
              }}
            >
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Post Title"
                value={newPostForm.title}
                onChange={(e) =>
                  setNewPostForm({ ...newPostForm, title: e.target.value })
                }
                required
              />
              <textarea
                className="w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Post Content"
                value={newPostForm.description}
                onChange={(e) =>
                  setNewPostForm({
                    ...newPostForm,
                    description: e.target.value,
                  })
                }
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Submit Post
                </button>
              </div>
            </form>
            <button
              className="mt-4 bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg"
              onClick={handleCloseAddPostModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-lg text-white font-bold mb-4">
              Login Required
            </h2>
            <p className="text-white mb-4">
              Please{" "}
              <a href="/login" className="text-blue-500 underline">
                login
              </a>{" "}
              to add a post.
            </p>
            <button
              className="mt-4 bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg"
              onClick={handleCloseAddPostModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPosts;
