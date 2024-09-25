const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../src/db");

module.exports = sequelize.define("requirement", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
