import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaCommentAlt, FaPlus } from "react-icons/fa";
import axios from "axios";

const InventSpace = () => {
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [userType, setUserType] = useState(""); // To store the user type
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showStudentWarning, setShowStudentWarning] = useState(false); // To show warning if user is not a student
  const [newPostForm, setNewPostForm] = useState({
    title: "",
    content: "",
    userId: "",
  });

  const [token, setToken] = useState(localStorage.getItem('token'));

  const fetchUserType = async () => {
    try {
      const token = localStorage.getItem("token"); // Ensure token is fetched correctly
      if (!token) {
        console.error("No token found");
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      };
  
      const response = await axios.get("http://localhost:3000/api/auth/user", config); // No need for userId in the URL
      setUserType(response.data.type);
    } catch (error) {
      console.error("Error fetching user type:", error);
    }
  };
  


  // Handle liking posts
  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
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

  // Open and close post viewing modal
  const openModal = (post) => {
    setActivePost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActivePost(null);
  };

  // Open and close post adding modal
  const openAddPostModal = () => {
    if (!token) {
      setShowLoginModal(true); // If not logged in, show login prompt
    } else if (userType === "student") {
      
      setShowAddPostModal(true);
      console.log(userType) // Only allow students to add posts
    } else {
      setShowStudentWarning(true); // Show warning if user is not a student
    }
  };

  const closeAddPostModal = () => {
    setShowAddPostModal(false);
    setNewPostForm({ title: "", content: "", userId: "" });
  };

  // Close login modal
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  // Close student warning
  const closeStudentWarning = () => {
    setShowStudentWarning(false);
  };

  // Handle submitting a new post
  const handlePostSubmit = () => {
    if (newPostForm.title && newPostForm.content && userId) {
      axios.post(`http://localhost:3000/api/content/post-invent/${userId}`, {
        title: newPostForm.title,
        description: newPostForm.content,
      }).then(() => {
          const newPost = { ...newPostForm, id: userId, likes: 0, comments: [] };
          setPosts([...posts, newPost]);
          closeAddPostModal();
      }).catch((err) => {
            alert("Cannot add post");
            console.log(err);
      });
    }
  };

  // Fetch posts from the API on mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/content/get-invent")
      .then((response) => {
        const formattedPosts = response.data.map((post) => ({
          id: post.id,
          title: post.title,
          content: post.description,
          likes: post.likes || 0,
          comments: post.comments || [],
        }));

        setPosts(formattedPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    fetchUserType(); // Fetch user type on mount
  }, []);

  return (
    <div className="p-4 bg-gray-800 min-h-screen" style={{ paddingTop: "80px" }}>
      {/* Add New Post Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">InventSpace</h1>
        <button
          className="flex items-center bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out"
          onClick={openAddPostModal}
        >
          <FaPlus className="mr-2" /> Add Post
        </button>
      </div>

      {/* List of Posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="mb-6 p-4 bg-gray-700 rounded-lg shadow-md border border-gray-600 transition duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-600"
          onClick={() => openModal(post)}
        >
          <div className="flex">
            {/* Upvote Button */}
            <div className="mr-4 flex flex-col items-center">
              <button
                className="text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(post.id);
                }}
              >
                <FaThumbsUp />
              </button>
              <span className="text-white">{post.likes}</span>
            </div>
            {/* Post Details */}
            <div className="flex-grow">
              <h2 className="text-lg font-semibold text-white">{post.title}</h2>
              <p className="mt-2 text-white">{post.content}</p>
            </div>
          </div>

          {/* Comments and Actions */}
          <div className="mt-4 flex items-center justify-between text-white">
            <span className="flex items-center">
              <FaCommentAlt className="mr-1" /> {post.comments.length}
            </span>
            <button
              className="text-white underline"
              onClick={() => openModal(post)}
            >
              View Post
            </button>
          </div>
        </div>
      ))}

      {/* Modal for Viewing Post */}
      {showModal && activePost && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-3xl">
            <h2 className="text-lg text-white font-bold mb-4">
              {activePost.title}
            </h2>
            <p className="text-white mb-4">{activePost.content}</p>

            {/* Comments Section */}
            <CommentSection
              postId={activePost.id}
              comments={activePost.comments}
              handleAddComment={handleAddComment}
              token={token} // Pass token to CommentSection
            />

            {/* Modal Close Button */}
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePostSubmit();
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
              />
              <textarea
                className="w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Post Content"
                rows="4"
                value={newPostForm.content}
                onChange={(e) =>
                  setNewPostForm({ ...newPostForm, content: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg"
              >
                Submit Post
              </button>
            </form>
            <button
              className="mt-4 w-full py-2 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg"
              onClick={closeAddPostModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Login Required */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg text-white">
            <h2 className="text-lg font-bold mb-4">Login Required</h2>
            <p>Please log in to add a post.</p>
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={closeLoginModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Non-Student Warning */}
      {showStudentWarning && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg text-white">
            <h2 className="text-lg font-bold mb-4">Access Denied</h2>
            <p>Only students are allowed to add posts in InventSpace.</p>
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={closeStudentWarning}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CommentSection = ({ postId, comments, handleAddComment, token }) => {
  const [newComment, setNewComment] = useState("");

  const submitComment = () => {
    if (token) {
      handleAddComment(postId, newComment);
      setNewComment("");
    } else {
      alert("You need to be logged in to comment.");
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-white">Comments</h3>
      <ul className="mt-2">
        {comments.map((comment, index) => (
          <li key={index} className="mb-2 text-white">
            {comment}
          </li>
        ))}
      </ul>
      <div className="mt-2 flex items-center">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
          onClick={submitComment}
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default InventSpace;
