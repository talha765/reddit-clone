const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../src/db");

module.exports = sequelize.define("research", {
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
