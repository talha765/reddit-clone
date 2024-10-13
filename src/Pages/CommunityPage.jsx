import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaThumbsUp, FaUser } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

const api_route = import.meta.env.VITE_API_URL_CONTENT;

const CommunityPage = () => {
  const location = useLocation();
  const { communityId, postId } = useParams();
  const userId = Cookies.get("id");
  const [post, setPost] = useState(location.state?.post || null);
  const [comments, setComments] = useState([]); // Initialize as empty array
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchComments = async () => {
      if (!post?.id) return; // Ensure post and post.id are available before making the API call

      try {
        const response = await axios.get(
          `${api_route}/post/${postId}/comments`
        );
        if (response.data) {
          setComments(response.data); // Set the fetched comments in state
          console.log("response: ",response.data);
        } else {
          console.error("No comments found in the response.");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments(); // Trigger the comments fetching
  }, [post]);

  const handleLike = async () => {
    if (!userId) return;

    try {
      const response = await axios.post(`${api_route}/postlike/${postId}`, { userId });
      if (response.data.message === "Liked") {
        setPost(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
      } else {
        setPost(prev => prev ? { ...prev, likes: prev.likes - 1 } : null);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${api_route}/add-post-comment/${postId}`,
        { userId, content: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedComment = response.data.comment;

      // Add the new comment to the comments state
      setComments((prevComments) => [...prevComments, updatedComment]);
      window.location.reload();
    } catch (error) {
      console.error("Error adding comment:", error);
    }

  };



  // Error state
  if (error) {
    return (
      <div className="p-4 bg-gray-800 min-h-screen" style={{ paddingTop: "80px" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  // No post found
  if (!post) {
    return (
      <div className="p-4 bg-gray-800 min-h-screen" style={{ paddingTop: "80px" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-white">Post not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-800 min-h-screen" style={{ paddingTop: "80px" }}>
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          
          {/* Post Details */}
          <h1 className="text-2xl font-bold text-white mb-4">{post.title}</h1>
          <p className="text-gray-300 mb-4">{post.description}</p>
          
          <div className="flex items-center justify-between text-gray-400 mb-6">
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <span>{post.author || "Anonymous"}</span>
            </div>
            <button 
              onClick={handleLike}
              className="flex items-center text-blue-500 hover:text-blue-400"
            >
              <FaThumbsUp className="mr-2" />
              <span>{post.likes || 0}</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Comments</h2>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg mb-2">
                  <p className="text-gray-300">{comment.content}</p>
                  <div className="text-gray-500 text-sm mt-1">
                    <FaUser className="inline mr-1" />
                    {comment.user.username || "Anonymous"}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No comments yet.</p>
            )}
          </div>

          {/* Add Comment Form */}
          {userId && (
            <form onSubmit={handleAddComment} className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 mb-2 bg-gray-800 text-white border border-gray-700 rounded-lg"
                placeholder="Add a comment..."
                rows="3"
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
              >
                Add Comment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
