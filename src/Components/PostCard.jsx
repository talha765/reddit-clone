// PostCard.jsx
import React from "react";
import { FaThumbsUp, FaCommentAlt } from "react-icons/fa";
import Cookies from 'js-cookie';

const PostCard = ({ post, handleLike, openModal }) => {
  return (
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
          <p className="mt-2 text-white">{post.description}</p>
        </div>
      </div>
      
    </div>
  );
};

export default PostCard;
