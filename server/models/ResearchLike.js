const { DataTypes } = require('sequelize');
const sequelize = require('../src/db');

const ResearchLike = sequelize.define('researchlike', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    postId: { type: DataTypes.INTEGER, allowNull: false },
});


module.exports = ResearchLike;
