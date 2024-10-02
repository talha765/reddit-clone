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
const PostLike = require('./models/PostLike');
const PostImage = require('./models/PostImage');
const UserCommunity = require('./models/UserCommunity');
const InventLike = require("./models/InventLike");
const RequirementLike = require("./models/RequirementLike");
const ResearchLike = require("./models/ResearchLike");
const InventComment = require('./models/InventComment');
const RequirementComment = require("./models/RequirementComment");
const ResearchComment = require("./models/ResearchComment")


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

Community.hasMany(UserCommunity, { foreignKey: 'communityId', as: 'user_communities' });

UserCommunity.belongsTo(User, { foreignKey: 'userId' });
UserCommunity.belongsTo(Community, { foreignKey: 'communityId' });

User.hasMany(UserCommunity, { foreignKey: 'userId' });

InventSpace.hasMany(InventLike); // A post can be liked by many users
User.hasMany(InventLike); // A user can like many posts

InventLike.belongsTo(User); // A like belongs to a user
InventLike.belongsTo(InventSpace); // A like belongs to a post

InventSpace.hasMany(RequirementLike); // A post can be liked by many users
User.hasMany(RequirementLike); // A user can like many posts

RequirementLike.belongsTo(User); // A like belongs to a user
RequirementLike.belongsTo(InventSpace); // A like belongs to a post

InventSpace.hasMany(ResearchLike); // A post can be liked by many users
User.hasMany(ResearchLike); // A user can like many posts

ResearchLike.belongsTo(User); // A like belongs to a user
ResearchLike.belongsTo(InventSpace); // A like belongs to a post

Post.hasMany(PostLike); // A post can be liked by many users
User.hasMany(PostLike); // A user can like many posts

PostLike.belongsTo(User); // A like belongs to a user
PostLike.belongsTo(Post); // A like belongs to a post

User.hasMany(InventComment, { foreignKey: 'userId' });
InventSpace.hasMany(InventComment, { foreignKey: 'postId' });
InventComment.belongsTo(User, { foreignKey: 'userId' });
InventComment.belongsTo(InventSpace, { foreignKey: 'postId' });

User.hasMany(RequirementComment, { foreignKey: 'userId' });
Requirement.hasMany(RequirementComment, { foreignKey: 'postId' });
RequirementComment.belongsTo(User, { foreignKey: 'userId' });
RequirementComment.belongsTo(Requirement, { foreignKey: 'postId' });

User.hasMany(ResearchComment, { foreignKey: 'userId' });
Research.hasMany(ResearchComment, { foreignKey: 'postId' });
ResearchComment.belongsTo(User, { foreignKey: 'userId' });
ResearchComment.belongsTo(Research, { foreignKey: 'postId' });

sequelize.sync({ alter: true });   

// Sync the database and start the server
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error('Unable to sync database:', err));
