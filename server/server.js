// server.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const sequelize = require('./src/db');
const contentRoutes = require('./routes/content');
const cors = require('cors');
const User = require('./models/User');
const InventSpace = require('./models/InventSpace');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Use the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);


User.hasMany(InventSpace, { as: "inventspaces", foreignKey: "userId" });
InventSpace.belongsTo(User, { foreignKey: "userId" });

// Sync the database and start the server
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error('Unable to sync database:', err));
