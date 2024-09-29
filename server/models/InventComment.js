// models/Comment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/db');
const User = require('./User');
const InventSpace = require('./InventSpace');

const InventComment = sequelize.define('inventcomment', {
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
      model: InventSpace, // The posts table
      key: 'id',
    },
  },
});

module.exports = InventComment;
