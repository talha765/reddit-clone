import React, { useState } from 'react';

const Requirements = () => {
    // State to store likes, comments, and replies for each post
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

    // Function to handle likes
    const handleLike = (postId) => {
        const updatedPosts = posts.map((post) =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
        );
        setPosts(updatedPosts);
    };

    // Function to add a comment
    const handleAddComment = (postId, comment) => {
        const updatedPosts = posts.map((post) =>
            post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
        );
        setPosts(updatedPosts);
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Educational Solutions</h1>
            {posts.map((post) => (
                <div key={post.id} className="mb-6 p-4 bg-gray-800 text-white rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">{post.title}</h2>
                    <p className="mt-2">{post.content}</p>

                    {/* Like Button */}
                    <div className="mt-4">
                        <button
                            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
                            onClick={() => handleLike(post.id)}
                        >
                            👍 Like {post.likes}
                        </button>
                    </div>

                    {/* Comment Section */}
                    <CommentSection
                        postId={post.id}
                        comments={post.comments}
                        handleAddComment={handleAddComment}
                    />
                </div>
            ))}
        </div>
    );
};

// Comment Section Component
const CommentSection = ({ postId, comments, handleAddComment }) => {
    const [newComment, setNewComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            handleAddComment(postId, newComment);
            setNewComment(""); // Clear the comment input field
        }
    };

    return (
        <div className="mt-4">
            <h3 className="font-semibold mb-2">Comments:</h3>
            <ul className="space-y-2">
                {comments.map((comment, index) => (
                    <li key={index} className="bg-gray-700 p-2 rounded-lg">
                        {comment}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 rounded-lg bg-gray-600 text-white"
                    placeholder="Write a comment..."
                />
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 mt-2 rounded-lg transition duration-200 ease-in-out"
                >
                    Comment
                </button>
            </form>
        </div>
    );
};

export default Requirements;
