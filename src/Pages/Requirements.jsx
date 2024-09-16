import React, { useState } from 'react';
import { FaThumbsUp, FaCommentAlt } from 'react-icons/fa'; // Ensure this import is added

const Requirements = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "Math: Solution to Calculus Assignment",
            content: "Here is the solution to the integral problem from last week's assignment. The detailed steps are provided in the attached PDF.",
            likes: 0,
            comments: [],
        },
        {
            id: 2,
            title: "English: Essay Structure Example",
            content: "Here is an example of how to structure your essays for the final exam. Follow this guide to improve your writing.",
            likes: 0,
            comments: [],
        },
        {
            id: 3,
            title: "Physics: Answer to Kinematics Problem",
            content: "This is the solution to the kinematics problem we discussed in class. I've included the formulas and explanation in the document.",
            likes: 0,
            comments: [],
        },
    ]);

    const handleLike = (postId) => {
        const updatedPosts = posts.map((post) =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
        );
        setPosts(updatedPosts);
    };

    const handleAddComment = (postId, comment) => {
        const updatedPosts = posts.map((post) =>
            post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
        );
        setPosts(updatedPosts);
    };

    return (
        <div className="p-4 bg-gray-800 min-h-screen">
            <h1 className="text-xl font-bold mb-4">Educational Solutions</h1>
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="mb-6 p-4 bg-gray-100 text-black rounded-lg shadow-md border border-gray-200 transition duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-400"
                >
                    <h2 className="text-lg font-semibold">{post.title}</h2>
                    <p className="mt-2 text-gray-700">{post.content}</p>

                    <div className="mt-4 flex items-center space-x-4">
                        <button
                            className="flex items-center text-gray-700 hover:text-blue-600"
                            onClick={() => handleLike(post.id)}
                        >
                            <FaThumbsUp className="mr-1" /> Like {post.likes}
                        </button>

                        <div className="flex items-center text-gray-700">
                            <FaCommentAlt className="mr-1" /> {post.comments.length} Comments
                        </div>
                    </div>

                    <CommentSection postId={post.id} comments={post.comments} handleAddComment={handleAddComment} />
                </div>
            ))}
        </div>
    );
};

const CommentSection = ({ postId, comments, handleAddComment }) => {
    const [newComment, setNewComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() !== "") {
            handleAddComment(postId, newComment);
            setNewComment("");
        }
    };

    return (
        <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2 text-gray-600">Comments</h3>
            {comments.length === 0 ? (
                <p className="text-gray-400">No comments yet.</p>
            ) : (
                <ul className="list-disc ml-6">
                    {comments.map((comment, index) => (
                        <li key={index} className="text-gray-700">
                            {comment}
                        </li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleSubmit} className="mt-2">
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    type="submit"
                    className="mt-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-1 px-4 rounded-lg transition duration-200 ease-in-out"
                >
                    Add Comment
                </button>
            </form>
        </div>
    );
};

export default Requirements;
