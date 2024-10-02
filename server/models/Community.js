// models/Community.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/db');
const Post = require('./PostImage.js');
const User = require('./User');
const UserCommunity = require('./UserCommunity');

const Community = sequelize.define('community', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});    
     

module.exports = Community;
