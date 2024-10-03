import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import axios from "axios";
import CommentSection from "../Components/CommentSection";
import Cookies from "js-cookie";
const api_route = "https://www.studentresearchlab.com/api/content";

const Invent_Page = () => {
  const location = useLocation();
  const { postId } = useParams();
  const userId = Cookies.get("id");
  const [post, setPost] = useState(location.state?.post || null);
  const token = Cookies.get("token");
  const [comments, setComments] = useState([]);

  // Fetch comments when the component mounts or when post changes
  useEffect(() => {
    const fetchComments = async () => {
      if (!post?.id) return; // Ensure post and post.id are available before making the API call

      try {
        const response = await axios.get(
          `${api_route}/inventspace/${post.id}/comments`
        );
        if (response.data) {
          setComments(response.data); // Set the fetched comments in state
          console.log("comments: ", response.data);
        } else {
          console.error("No comments found in the response.");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments(); // Trigger the comments fetching
  }, [post]);

  // Handle adding a new comment
  const handleAddComment = async (postId, content) => {
    try {
      const response = await axios.post(
        `${api_route}/add-invent-comment/${postId}`,
        { userId, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedComment = response.data.comment;

      // Add the new comment to the comments state
      setComments((prevComments) => [...prevComments, updatedComment]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Handle liking the post
  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${api_route}/inventlike/${post.id}`,
        { userId }
      );

      const isLiked = response.data.message === "Liked";

      // Update the post's like count
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
      {post ? (
        <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl text-white font-bold mb-4">{post.title}</h1>

          {/* Render post description or content */}
          {post.description ? (
            post.description.includes("\n") ? (
              <p className="mt-2 text-white overflow-hidden text-ellipsis">
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.description.replace(/\n/g, "<br/>"),
                  }}
                ></div>
              </p>
            ) : (
              <p className="mt-2 text-white">{post.description}</p> // Render description as plain text if no line breaks
            )
          ) : post.content && post.content.includes("\n") ? ( // Check for post.content only if description is not present
            <p className="mt-2 text-white overflow-hidden text-ellipsis">
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(/\n/g, "<br/>"),
                }}
              ></div>
            </p>
          ) : (
            <p className="mt-2 text-white">{post.content}</p> // Render content as plain text if no line breaks
          )}

          {/* Like button and like count */}
          <span className="flex items-center text-white mb-2">
            <FaThumbsUp
              className={`mr-1`}
              onClick={(e) => {
                e.stopPropagation();
                handleLike(post.id);
              }}
            />
            {post.likes}
          </span>

          {/* Comments Section */}
          <h3 className="text-white font-bold mb-2">Comments</h3>
          <CommentSection
            postId={post.id}
            comments={comments} // Pass the fetched comments to the CommentSection
            handleAddComment={handleAddComment} // Handle adding a new comment
          />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
          <p>No posts to show</p>
        </div>
      )}
    </div>
  );
};

export default Invent_Page;
