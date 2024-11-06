// models/Lnd.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/db');

const Lnd = sequelize.define('Lnd', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  limit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.BLOB('long'), // Store image as binary data
    allowNull: true
  },
  registrationCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  tableName: 'lnd',
  timestamps: true
});

module.exports = Lnd;
