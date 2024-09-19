import React, { useState } from 'react';
import { FaThumbsUp, FaCommentAlt, FaPlus, FaArrowRight } from 'react-icons/fa';

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

    const [showModal, setShowModal] = useState(false);
    const [activePost, setActivePost] = useState(null);
    const [newPost, setNewPost] = useState({ title: '', content: '' });

    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [newPostForm, setNewPostForm] = useState({ title: '', content: '' });

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

    const openModal = (post) => {
        setActivePost(post);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setActivePost(null);
    };

    const openAddPostModal = () => {
        setShowAddPostModal(true);
    };

    const closeAddPostModal = () => {
        setShowAddPostModal(false);
        setNewPostForm({ title: '', content: '' });
    };

    const handlePostSubmit = () => {
        if (newPostForm.title && newPostForm.content) {
            const newPostId = posts.length ? Math.max(posts.map(post => post.id)) + 1 : 1;
            const newPost = { ...newPostForm, id: newPostId, likes: 0, comments: [] };
            setPosts([...posts, newPost]);
            closeAddPostModal();
        }
    };

    return (
        <div className="p-4 bg-gray-800 min-h-screen" style={{ paddingTop: '80px' }}>
            {/* Add New Post Button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">InventSpace</h1>
                <button
                    className="flex items-center bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out"
                    onClick={openAddPostModal}
                >
                    <FaPlus className="mr-2" /> Add Post
                </button>
            </div>

            {/* List of Posts */}
            {posts.map((post) => (
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
                            <p className="mt-2 text-white">{post.content}</p>
                        </div>
                    </div>

                    {/* Comments and Actions */}
                    <div className="mt-4 flex items-center justify-between text-white">
                        <span className="flex items-center">
                            <FaCommentAlt className="mr-1" /> {post.comments.length} Comments
                        </span>
                        <button
                            className="text-white underline"
                            onClick={() => openModal(post)}
                        >
                            View Post
                        </button>
                    </div>
                </div>
            ))}

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
                        <form onSubmit={(e) => { e.preventDefault(); handlePostSubmit(); }}>
                            <input
                                type="text"
                                className="w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Post Title"
                                value={newPostForm.title}
                                onChange={(e) => setNewPostForm({ ...newPostForm, title: e.target.value })}
                            />
                            <textarea
                                className="w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Post Content"
                                rows="4"
                                value={newPostForm.content}
                                onChange={(e) => setNewPostForm({ ...newPostForm, content: e.target.value })}
                            />
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg"
                                    onClick={closeAddPostModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
                                >
                                    Add Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const CommentSection = ({ postId, comments, handleAddComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() !== '') {
            handleAddComment(postId, newComment);
            setNewComment(''); // Clear input after submitting comment
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-sm font-semibold mb-2 text-white">Comments</h3>

            {/* Scrollable Comments Section */}
            <div className="max-h-32 overflow-y-auto bg-gray-700 rounded-lg p-4 mb-4">
                {comments.length === 0 ? (
                    <p className="text-white">No comments yet.</p>
                ) : (
                    <ul className="list-disc ml-6 text-white">
                        {comments.map((comment, index) => (
                            <li key={index} className="mb-2">
                                {comment}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Add Comment */}
            <form onSubmit={handleSubmit} className="mt-2 flex items-center">
                <input
                    type="text"
                    className="flex-grow p-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    type="submit"
                    className="ml-2 bg-blue-600 hover:bg-blue-500 p-2 rounded-lg text-white"
                >
                    <FaArrowRight />
                </button>
            </form>
        </div>
    );
};

export default Requirements;
