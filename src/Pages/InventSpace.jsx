import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaCommentAlt, FaPlus } from "react-icons/fa";
import axios from "axios";

const InventSpace = () => {
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [userType, setUserType] = useState("");
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showStudentWarning, setShowStudentWarning] = useState(false);
  const [newPostForm, setNewPostForm] = useState({
    title: "",
    content: "",
    userId: "",
  });

  const [token, setToken] = useState(localStorage.getItem("token"));

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
      const response = await axios.get("http://localhost:3000/api/auth/user", config);
      setUserType(response.data.type);
    } catch (error) {
      console.error("Error fetching user type:", error);
    }
  };

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
    } else if (userType !== "student") {
      setShowStudentWarning(true);
    } else {
      setShowAddPostModal(true);
    }
  };

  const closeAddPostModal = () => {
    setShowAddPostModal(false);
    setShowStudentWarning(false);
    setShowLoginModal(false);
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleAddPost = () => {
    const newPost = {
      id: posts.length + 1,
      title: newPostForm.title,
      content: newPostForm.content,
      likes: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setNewPostForm({ title: "", content: "", userId: "" });
    closeAddPostModal();
  };

  return (
    <div className="p-4 bg-gray-800 min-h-screen" style={{ paddingTop: "80px", overflow: "hidden" }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
        {/* Main Posts Section */}
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">InventSpace</h1>
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
              onClick={() => openModal(post)}
              style={{ maxWidth: "100%", height: "190px" }} // Reduced the height by 1 unit as requested
            >
              <h2 className="text-xl font-semibold text-white">{post.title}</h2>
              <p className="mt-2 text-white overflow-hidden text-ellipsis">{post.content}</p>
              <div className="mt-4 flex items-center justify-between text-white">
                <div className="flex">
                  <div className="mr-4 flex items-center">
                    <button
                      className="text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(post.id);
                      }}
                    >
                      <FaThumbsUp />
                    </button>
                    <span className="text-white ml-2">{post.likes}</span>
                  </div>
                  <span className="flex items-center">
                    <FaCommentAlt className="mr-1" /> {post.comments.length}
                  </span>
                </div>
                <button className="text-white underline" onClick={() => openModal(post)}>
                  View Post
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Top Communities Section */}
        <div className="col-span-1">
          <div className="bg-gray-900 p-4 rounded-lg shadow-md" style={{ width: "100%", minHeight: "600px" }}> {/* Increased overall container height */}
            <h2 className="text-xl font-bold text-white mb-4 text-center">Top Communities</h2>
            <ul className="space-y-9">
              {/* Limited to only 4 communities, increased height of each community */}
              <li className="bg-gray-800 p-4 rounded-md text-white" style={{ height: "100px" }}>
                Community 1
              </li>
              <li className="bg-gray-800 p-4 rounded-md text-white" style={{ height: "100px" }}>
                Community 2
              </li>
              <li className="bg-gray-800 p-4 rounded-md text-white" style={{ height: "100px" }}>
                Community 3
              </li>
              <li className="bg-gray-800 p-4 rounded-md text-white" style={{ height: "100px" }}>
                Community 4
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal for Viewing Post */}
      {showModal && activePost && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-3xl">
            <h2 className="text-lg text-white font-bold mb-4">{activePost.title}</h2>
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
                handleAddPost();
              }}
            >
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Post Title"
                value={newPostForm.title}
                onChange={(e) => setNewPostForm({ ...newPostForm, title: e.target.value })}
                required
              />
              <textarea
                className="w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Post Content"
                value={newPostForm.content}
                onChange={(e) => setNewPostForm({ ...newPostForm, content: e.target.value })}
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
              onClick={closeAddPostModal}
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
            <h2 className="text-lg text-white font-bold mb-4">Login Required</h2>
            <p className="text-white mb-4">
              Please <a href="/login" className="text-blue-500 underline">login</a> to add a post.
            </p>
            <button
              className="mt-4 bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg"
              onClick={closeAddPostModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Student Warning Modal */}
      {showStudentWarning && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-lg text-white font-bold mb-4">Permission Denied</h2>
            <p className="text-white mb-4">
              Only students are allowed to add posts. Please contact your administrator if you need access.
            </p>
            <button
              className="mt-4 bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg"
              onClick={closeAddPostModal}
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        "http://localhost:3000/api/content/createComment",
        {
          postId: postId,
          description: newComment,
        },
        config
      );

      const comment = {
        id: Date.now(),
        content: newComment,
      };

      handleAddComment(postId, comment);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <h3 className="text-white font-bold mb-2">Comments</h3>
      {comments.length > 0 ? (
        <ul className="space-y-2 mb-4">
          {comments.map((comment) => (
            <li key={comment.id} className="p-2 bg-gray-700 rounded-md text-white">
              {comment.content}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 mb-4">No comments yet.</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full p-2 mb-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default InventSpace;
