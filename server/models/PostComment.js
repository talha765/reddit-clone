// models/Comment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/db');
const User = require('./User');
const Post = require('./Post');

const PostComment = sequelize.define('postcomment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,  
      key: 'id',
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post, // The posts table
      key: 'id',
    },
  },
});

module.exports = PostComment;
