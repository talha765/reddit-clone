import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import axios from "axios";
import CommentSection from "../Components/CommentSection";
import Cookies from "js-cookie";

const Invent_Page = () => {
  const location = useLocation();
  const { postId } = useParams();
  const userId = Cookies.get("id");
  const [post, setPost] = useState(location.state?.post || null);
  const token = Cookies.get("token");

  console.log("Post data:", post);
  console.log("location.state:", location.state);

  const handleAddComment = async (postId, content) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/content/add-invent-comment/${postId}`,
        { userId, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedComment = response.data.comment;

      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, updatedComment],
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/content/inventlike/${post.id}`,
        { userId }
      );

      const isLiked = response.data.message === "Liked";

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

          {/* Check if post.content exists before using includes */}
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
          <h3 className="text-white font-bold mb-2">Comments</h3>
          <CommentSection
            postId={post.id}
            comments={post.comments}
            handleAddComment={handleAddComment}
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
