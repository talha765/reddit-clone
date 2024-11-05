// models/UserLnd.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/db');

const UserLnd = sequelize.define('UserLnd', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // Name of the table
      key: 'id'
    }
  },
  lndId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'lnd', // Name of the table
      key: 'id'
    }
  }
}, {
  tableName: 'user_lnd',
  timestamps: false
});

module.exports = UserLnd;
