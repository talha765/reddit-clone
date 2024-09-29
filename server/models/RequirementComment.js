// models/Comment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/db');
const User = require('./User');
const Requirement = require('./Requirement');

const RequirementComment = sequelize.define('requirementcomment', {
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
      model: Requirement, // The posts table
      key: 'id',
    },
  },
});

module.exports = RequirementComment;
