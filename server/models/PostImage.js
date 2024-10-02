// models/PostImage.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/db');
const Post = require('./Post');

const PostImage = sequelize.define('post_image', {
  imageData: {
    type: DataTypes.BLOB('long'),  // Binary data for storing images
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,  // Optional description for the image
    allowNull: true,
  },
});


module.exports = PostImage;
