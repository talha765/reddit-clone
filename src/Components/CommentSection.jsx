import React, { useState } from "react";

const CommentSection = ({ postId, comments, handleAddComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddComment(postId, newComment);
    setNewComment("");
  };

  return (
    <div>
      <div className="space-y-4 mt-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-3 bg-gray-900 text-white rounded-lg"
          >
            <div className="p-2 bg-gray-800 rounded-md mb-2">
              {" "}
              {/* Light gray background */}
              <p>{comment.content}</p>
              <p className="text-teal-500">posted by user with id: {comment.userId}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          className="w-full p-2 rounded-md"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
