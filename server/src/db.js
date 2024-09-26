// src/db.js
const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('SRL', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));


module.exports = sequelize;
