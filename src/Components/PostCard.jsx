// PostCard.jsx
import React from "react";
import { FaThumbsUp, FaCommentAlt } from "react-icons/fa";
import Cookies from 'js-cookie';
import _ from "lodash";

const PostCard = ({ post, handleClick }) => {
  return (
    <div
      key={post.id}
      className="mb-6 p-4 bg-gray-700 rounded-lg shadow-md border border-gray-600 transition duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-600"
      onClick={() => handleClick(post)}
    >
      <div className="flex">
        {/* Upvote Button */}

        {/* Post Details */}
        <div className="flex-grow">
          <h2 className="text-lg font-semibold text-white">{_.truncate(post.title, { length: 30 })}</h2>
          <p className="mt-2 text-white">{_.truncate(post.description, { length: 30 })}</p>
        </div>
      </div>
      
    </div>
  );
};

export default PostCard;
