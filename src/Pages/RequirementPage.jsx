import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaThumbsUp, FaCommentAlt, FaPlus } from "react-icons/fa";
import axios from "axios";
import CommentSection from "../Components/CommentSection";

const Requirement_Page = () => {
  const location = useLocation();
  const { postId } = useParams();
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [post, setPost] = useState(location.state?.post || null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log(post);

  const handleAddComment = async (postId, content) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/content/add-requirement-comment/${postId}`,
        { userId, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedComment = response.data.comment;

      const updatedPost = ((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, updatedComment] }
          : post
      );
      setPost(updatedPost);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post) {
    return <div>No post data available.</div>; // Handle case where no post data is passed
  }

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/content/requirementlike/${post.id}`,
        { userId }
      );
  
      // Check if the response indicates the action was a "Like" or "Unlike"
      const isLiked = response.data.message === "Liked";
  
      // Update the post state based on the response
      setPost((prevPost) => ({
        ...prevPost,
        likes: isLiked ? prevPost.likes + 1 : prevPost.likes - 1,
      }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-800 min-h-screen mt-20">
      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl text-white font-bold mb-4">{post.title}</h1>
        <p className="text-white mb-6">{post.content}</p>
        <span className="flex items-center text-white mb-2">
          <FaThumbsUp
            className={`mr-1`} // Change color based on like state
            onClick={(e) => {
              e.stopPropagation();
              handleLike(post.id);
            }}
          />
          {post.likes}
        </span>
        <h3 className="text-white font-bold mb-2">Comments</h3>
        
          <CommentSection
              postId={post.id}
              comments={post.comments}
              handleAddComment={handleAddComment}
            />
      </div>
    </div>
  );
};

export default Requirement_Page;   
