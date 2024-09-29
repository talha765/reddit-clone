// models/Comment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/db');
const User = require('./User');
const Research = require('./Research');

const ResearchComment = sequelize.define('researchcomment', {
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
      model: Research, // The posts table
      key: 'id',
    },
  },
});

module.exports = ResearchComment;
