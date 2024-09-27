// server.js
const express = require('express');
const authRoutes = require('./routes/auth');
const sequelize = require('./src/db');
const contentRoutes = require('./routes/content');
const cors = require('cors');
const User = require('./models/User');
const InventSpace = require('./models/InventSpace');
const Requirement = require('./models/Requirement');
const Research = require('./models/Research');
const Community = require('./models/Community');
const Post = require('./models/Post');
const PostImage = require('./models/PostImage');
const UserCommunity = require('./models/UserCommunity');


const app = express();

app.use(cors({
  origin: 'http://localhost:5172', // Allow only your frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Use the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);


User.hasMany(InventSpace, { as: "inventspaces", foreignKey: "userId" });
InventSpace.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Requirement, { as: "requirements", foreignKey: "userId" });
Requirement.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Research, { as: "research", foreignKey: "userId" });
Research.belongsTo(User, { foreignKey: "userId" });

Community.hasMany(Post, { as: 'posts' });  // A community can have many posts
Community.belongsToMany(User, { through: UserCommunity, as: 'users' });

Post.belongsTo(User, { as: 'author' });  // A post is created by one user
Post.belongsTo(Community, { as: 'community' });  // A post belongs to one community
Post.hasMany(PostImage, { as: 'images' });  // A post can have multiple images
PostImage.belongsTo(Post);

User.belongsToMany(Community, { through: UserCommunity, as: 'communities' });  // User can join multiple communities
User.hasMany(Post, { as: 'posts' });  // User can create many posts

Community.hasMany(UserCommunity, { foreignKey: 'communityId' });

UserCommunity.belongsTo(User, { foreignKey: 'userId' });
UserCommunity.belongsTo(Community, { foreignKey: 'communityId' });

User.hasMany(UserCommunity, { foreignKey: 'userId' });

// Sync the database and start the server
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error('Unable to sync database:', err));
