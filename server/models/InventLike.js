// models/InventLike.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/db');

const InventLike = sequelize.define('inventlike', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    postId: { type: DataTypes.INTEGER, allowNull: false },
});


module.exports = InventLike;
