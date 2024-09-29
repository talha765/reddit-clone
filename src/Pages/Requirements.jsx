import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaCommentAlt, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const Requirements = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [topCommunities, setTopCommunities] = useState([]);
  const [userType, setUserType] = useState("");
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCompanyWarning, setShowCompanyWarning] = useState(false);
  const [newPostForm, setNewPostForm] = useState({
    title: "",
    content: "",
    userId: "",
  });

  // State to manage the token
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/content/get-top-communities")
      .then((response) => {
        // Logic for top communities, sorted by member count
        console.log("API Response:", response.data); // Check the response structure
        const unfilteredCommunities = response.data;

        // Sort all communities by memberCount in descending order
        const sortedByMemberCount = unfilteredCommunities.sort(
          (a, b) => b.memberCount - a.memberCount
        );

        // Set the top 5 communities
        setTopCommunities(sortedByMemberCount.slice(0, 5));
        console.log("top communities: ", topCommunities);
      })
      .catch((error) => {
        console.error("Error fetching top communities:", error);
      });
  }, []);

  const fetchUserType = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "http://localhost:3000/api/auth/user",
        config
      );
      setUserType(response.data.type);
    } catch (error) {
      console.error("Error fetching user type:", error);
    }
  };

  // Handle liking posts
  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/content/requirementlike/${postId}`,
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

  // Handle adding comments
  const handleAddComment = (postId, comment) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    );
    setPosts(updatedPosts);
  };

  const openModal = (post) => {
    setActivePost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActivePost(null);
  };

  const openAddPostModal = () => {
    if (!userId) {
      setShowLoginModal(true);
    } else if (userType !== "company") {
      setShowCompanyWarning(true);
    } else {
      setShowAddPostModal(true);
    }
  };

  const closeAddPostModal = () => {
    setShowAddPostModal(false);
    setShowCompanyWarning(false);
    setShowLoginModal(false);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const closeCompanyWarning = () => {
    setShowCompanyWarning(false);
  };

  const handleAddPost = async () => {
    if (newPostForm.title && newPostForm.content && userId) {
      try {
        await axios.post(
          `http://localhost:3000/api/content/post-requirement/${userId}`,
          {
            title: newPostForm.title,
            description: newPostForm.content,
          }
        );
        const newPost = {
          ...newPostForm,
          id: userId,
          likes: 0,
          comments: [],
        };
        setPosts([...posts, newPost]);
        closeAddPostModal();
      } catch (err) {
        alert("Cannot add post");
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchUserType();
    
    axios
      .get("http://localhost:3000/api/content/get-requirements")
      .then(async (response) => {
        const posts = response.data;
  
        // Fetch comments for each post in parallel using Promise.all
        const postsWithComments = await Promise.all(
          posts.map(async (post) => {
            try {
              // Fetch comments for each post
              const commentsResponse = await axios.get(
                `http://localhost:3000/api/content/requirement/${post.id}/comments`
              );
              const comments = commentsResponse.data;
  
              // Return post with comments included
              return {
                id: post.id,
                title: post.title,
                content: post.description,
                likes: post.likes,
                comments: comments || [],  // Include fetched comments
                commentsCount: comments.length || 0,  // Update comments count based on fetched comments
              };
            } catch (error) {
              console.error(`Error fetching comments for post ${post.id}:`, error);
              return {
                id: post.id,
                title: post.title,
                content: post.description,
                likes: post.likes,
                comments: [],  // Default to empty comments if error occurs
                commentsCount: 0,
              };
            }
          })
        );
  
        // Set the formatted posts with comments
        setPosts(postsWithComments);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [posts]);

  return (
    <div
      className="p-4 bg-gray-800 min-h-screen"
      style={{ paddingTop: "80px" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
        {/* Main Posts Section */}
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Requirements</h1>
            <button
              className="flex items-center bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out"
              onClick={openAddPostModal}
            >
              <FaPlus className="mr-2" /> Add Post
            </button>
          </div>

          {posts.map((post) => (
            <div
              key={post.id}
              className="mb-6 p-4 bg-gray-900 rounded-lg shadow-md border border-gray-600 transition duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-700"
              onClick={() => navigate(`/requirement-post/${post.id}`, { state: { post } })}
              style={{ maxWidth: "100%", height: "150px" }} // Reduced the height by 1 unit as requested
            >
             <h2 className="text-xl font-semibold text-white">
                {_.truncate(post.title, { length: 30 })}
              </h2>
              <p className="mt-2 text-white overflow-hidden text-ellipsis">
                {_.truncate(post.content, { length: 30 })}
              </p>
              <div className="mt-4 flex items-end justify-between text-white ">
                <div className="flex">
                  <div className="mr-4 flex items-center">
                    <span className="flex items-center text-white ml-2">
                      <FaThumbsUp
                        className={`mr-1`} // Change color based on like state
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(post.id);
                        }}
                      />
                      {post.likes}
                    </span>
                  </div>
                  <span className="flex items-center">
                    <FaCommentAlt className="mr-1" /> {post.comments.length}
                  </span>
                </div>
                {/* <button
                  className="text-white underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/requirement-post/${post}`);
                  }}
                >
                  View Post
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Top Communities Section */}
        <div className="col-span-1">
          <div
            className="bg-gray-900 p-4 rounded-lg shadow-md"
            style={{ width: "100%", minHeight: "600px" }}
          >
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              Top Communities
            </h2>
            <ul className="space-y-4">
              {topCommunities.map((community) => {
                return (
                  <li
                    key={community.id}
                    className="bg-gray-800 p-4 rounded-md text-white"
                    style={{ height: "100px" }}
                  >
                    {community.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal for Viewing Post */}
      {showModal && activePost && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-3xl">
            <h2 className="text-lg text-white font-bold mb-4">
              {activePost.title}
            </h2>
            <p className="text-white mb-4">{activePost.content}</p>

            <CommentSection
              postId={activePost.id}
              comments={activePost.comments}
              handleAddComment={handleAddComment}
              token={token}
            />

            <button
              className="mt-4 bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Adding New Post */}
      {showAddPostModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-3xl">
            <h2 className="text-lg text-white font-bold mb-4">Add New Post</h2>
            <input
              className="w-full mb-4 p-2 rounded-lg bg-gray-700 text-white"
              type="text"
              placeholder="Title"
              value={newPostForm.title}
              onChange={(e) =>
                setNewPostForm({ ...newPostForm, title: e.target.value })
              }
            />
            <textarea
              className="w-full mb-4 p-2 rounded-lg bg-gray-700 text-white"
              rows="5"
              placeholder="Content"
              value={newPostForm.content}
              onChange={(e) =>
                setNewPostForm({ ...newPostForm, content: e.target.value })
              }
            />
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={handleAddPost}
            >
              Add Post
            </button>
            <button
              className="ml-4 bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg"
              onClick={closeAddPostModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Login Warning Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-3xl">
            <h2 className="text-lg text-white font-bold mb-4">
              Login Required
            </h2>
            <p className="text-white mb-4">Please login to add a post.</p>
            <button
              className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg"
              onClick={closeLoginModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Company Warning Modal */}
      {showCompanyWarning && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-3xl">
            <h2 className="text-lg text-white font-bold mb-4">
              Company Account Required
            </h2>
            <p className="text-white mb-4">
              Only companies are allowed to add posts. Please login as a company
              to proceed.
            </p>
            <button
              className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg"
              onClick={closeCompanyWarning}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CommentSection = ({ postId, comments, handleAddComment }) => {
  const [commentInput, setCommentInput] = useState("");

  const submitComment = () => {
    if (commentInput.trim()) {
      const newComment = { postId, content: commentInput };
      handleAddComment(postId, newComment);
      setCommentInput("");
    }
  };

  return (
    <div>
      <h3 className="text-lg text-white font-bold">Comments</h3>
      <div className="mb-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="bg-gray-700 p-2 rounded-lg mb-2">
              <p className="text-white">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-white">No comments yet.</p>
        )}
      </div>
      <textarea
        className="w-full mb-2 p-2 rounded-lg bg-gray-700 text-white"
        rows="3"
        placeholder="Add a comment"
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
      />
      <button
        className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
        onClick={submitComment}
      >
        Add Comment
      </button>
    </div>
  );
};

export default Requirements;
