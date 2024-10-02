// components/UserModal.js
import React from 'react';
import Cookies from 'js-cookie';

const UserModal = ({ user, onClose }) => {
  if (!user) return null; // Don't render if no user

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-gray-900 rounded-lg p-6 w-80">
        <h2 className="text-lg text-white font-bold">User Information</h2>
        <p className="text-white">Full Name: {`${user.firstName} ${user.lastName}`}</p>
        <p className="text-white">Username: {user.username}</p>
        <p className="text-white">Type: {user.type}</p>
        <button
          className="mt-4 bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserModal;
