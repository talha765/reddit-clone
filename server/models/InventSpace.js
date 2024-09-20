const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../src/db");

module.exports = sequelize.define("inventspace", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
