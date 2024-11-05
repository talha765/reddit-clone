const express = require('express');
const path = require('path'); // Import path to handle file paths
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
const ResearchComment = require('./models/ResearchComment');
const PostComment = require('./models/PostComment');
const Lnd = require('./models/Lnd');
const UserLnd = require('./models/UserLnd');

const app = express();

app.use(cors({
  origin: 'http://localhost:5172', // Allow only your frontend origin

}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

// Database associations
User.hasMany(InventSpace, { as: "inventspaces", foreignKey: "userId" });
InventSpace.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Requirement, { as: "requirements", foreignKey: "userId" });
Requirement.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Research, { as: "research", foreignKey: "userId" });
Research.belongsTo(User, { foreignKey: "userId" });

Community.hasMany(Post, { as: 'posts' });
Community.belongsToMany(User, { through: UserCommunity, as: 'users' });

Post.belongsTo(User, { as: 'author' });
Post.belongsTo(Community, { as: 'community' });
Post.hasMany(PostImage, { as: 'images' });
PostImage.belongsTo(Post);

User.belongsToMany(Community, { through: UserCommunity, as: 'communities' });
User.hasMany(Post, { as: 'posts' });

Community.hasMany(UserCommunity, { foreignKey: 'communityId', as: 'user_communities' });

UserCommunity.belongsTo(User, { foreignKey: 'userId' });
UserCommunity.belongsTo(Community, { foreignKey: 'communityId' });

User.hasMany(UserCommunity, { foreignKey: 'userId' });

InventSpace.hasMany(InventLike);
User.hasMany(InventLike);

InventLike.belongsTo(User);
InventLike.belongsTo(InventSpace);

InventSpace.hasMany(RequirementLike);
User.hasMany(RequirementLike);

RequirementLike.belongsTo(User);
RequirementLike.belongsTo(InventSpace);

InventSpace.hasMany(ResearchLike);
User.hasMany(ResearchLike);

ResearchLike.belongsTo(User);
ResearchLike.belongsTo(InventSpace);

Post.hasMany(PostLike);
User.hasMany(PostLike);

PostLike.belongsTo(User);
PostLike.belongsTo(Post);

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

User.hasMany(PostComment, { foreignKey: 'userId' });
Post.hasMany(PostComment, { foreignKey: 'postId' });
PostComment.belongsTo(User, { foreignKey: 'userId' });
PostComment.belongsTo(Research, { foreignKey: 'postId' });

User.belongsToMany(Lnd, { through: UserLnd, foreignKey: 'userId' });
Lnd.belongsToMany(User, { through: UserLnd, foreignKey: 'lndId' });

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

sequelize.sync({ alter: true }); 

// Sync the database and start the server
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error('Unable to sync database:', err));
