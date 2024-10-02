// models/UserCommunity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/db');
const User = require('./User');
const Community = require('./Community');

const UserCommunity = sequelize.define('user_community', {
  role: {
    type: DataTypes.STRING,  // Optional: Define the user's role within the community (e.g., "member", "moderator", etc.)
    allowNull: true,
  },
});

// Associations (already handled in User and Community models)
module.exports = UserCommunity;
