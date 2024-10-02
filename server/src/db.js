const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const testPass= process.env.DB_PASSWORD;
console.log("pass: ",testPass);

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Add port here
    dialect: "postgres"
    // dialectOptions: { // Add SSL options here
    //   // ssl: {
    //   //   require: true,
    //   //   rejectUnauthorized: false
    //   // }
    // }
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
