// models/Post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/db');
const User = require('./User');
const Community = require('./Community');
const PostImage = require('./PostImage');

const Post = sequelize.define('post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    // Adding likes field
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  commentsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});



module.exports = Post;
