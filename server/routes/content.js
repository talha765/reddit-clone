const express = require("express");
const User = require("../models/User");
const router = express.Router();
const inventspace = require("../models/InventSpace");
const Requirement = require("../models/Requirement");
const Research = require("../models/Research");
const { Op } = require("sequelize");
const Community = require("../models/Community");
const UserCommunity = require("../models/UserCommunity");
const Post = require("../models/Post");
const InventLike = require("../models/InventLike");
const RequirementLike = require("../models/RequirementLike");
const ResearchLike = require("../models/ResearchLike");
const PostLike = require('../models/PostLike');
const PostComment = require('../models/PostComment');
const InventComment = require('../models/InventComment');
const RequirementComment = require('../models/RequirementComment');
const ResearchComment = require('../models/ResearchComment');
const Lnd = require('../models/Lnd');
const UserLnd = require('../models/UserLnd');
const sequelize = require("../src/db");
const nodemailer = require('nodemailer');


router.post('/contact', async (req, res) => {
  const { name, email, phone, feedback } = req.body;

    if (!name || !email || !phone || !feedback) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hamza.designservices2002@gmail.com', // Replace with your Gmail address
            pass: 'isjx kipr typn wgxw' // Replace with your Gmail password or App password
        }
    });

    // Email options
    const mailOptions = {
        from: email, // sender address (user's email)
        to: 'studentresearchlabhome@gmail.com', // the recipient email
        subject: `New Contact Form Submission from ${name}`,
        text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        
        Feedback:
        ${feedback}
        `
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Your feedback has been sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending your feedback. Please try again later.' });
    }
});


router.post('/add-invent-comment/:postId', async (req, res) => {
  const { userId, content } = req.body;
  const {postId} = req.params; // Assuming user ID is in the token

  try {
    const comment = await InventComment.create({
      postId,
      userId,
      content,
    });
    await inventspace.increment('commentsCount', { where: { id: postId } });
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/inventspace/:postId/comments', async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await InventComment.findAll({
      where: { postId },
      include: ['user'], // Include user details
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

router.post('/add-post-comment/:postId', async (req, res) => {
  const { userId, content } = req.body;
  const {postId} = req.params; // Assuming user ID is in the token

  try {
    const comment = await PostComment.create({
      postId,
      userId,
      content,
    });
    await Post.increment('commentsCount', { where: { id: postId } });
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/post/:postId/comments', async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await PostComment.findAll({
      include: {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
      where: { postId },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

router.post('/add-requirement-comment/:postId', async (req, res) => {
  const { userId, content } = req.body;
  const {postId} = req.params; // Assuming user ID is in the token

  try {
    const comment = await RequirementComment.create({
      postId,
      userId,
      content,
    });
    await Requirement.increment('commentsCount', { where: { id: postId } });
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/requirement/:postId/comments', async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await RequirementComment.findAll({
      where: { postId },
      include: ['user'], // Include user details
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

router.post('/add-research-comment/:postId', async (req, res) => {
  const { userId, content } = req.body;
  const {postId} = req.params; // Assuming user ID is in the token

  try {
    const comment = await ResearchComment.create({
      postId,
      userId,
      content,
    });
    await Research.increment('commentsCount', { where: { id: postId } });
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/research/:postId/comments', async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await ResearchComment.findAll({
      where: { postId },
      include: ['user'], // Include user details
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

router.post('/inventlike/:postId', async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  try {
      const existingLike = await InventLike.findOne({ where: { userId, postId } });
      
      if (existingLike) {
          await existingLike.destroy(); // Unlike
          await inventspace.decrement('likes', { where: { id: postId } }); // Decrement likes count
          return res.json({ message: 'Unliked' });
      } else {
          await InventLike.create({ userId, postId }); // Like
          await inventspace.increment('likes', { where: { id: postId } }); // Increment likes count
          return res.json({ message: 'Liked' });
      }
      
  } catch (error) {
      res.status(500).json({ error: 'Error processing like' });
  }
});



router.post('/postlike/:postId', async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  try {
      const existingLike = await PostLike.findOne({ where: { userId, postId } });
      
      if (existingLike) {
          await existingLike.destroy(); // Unlike
          await Post.decrement('likes', { where: { id: postId } }); // Decrement likes count
          return res.json({ message: 'Unliked' });
      } else {
          await PostLike.create({ userId, postId }); // Like
          await Post.increment('likes', { where: { id: postId } }); // Increment likes count
          return res.json({ message: 'Liked' });
      }
      
  } catch (error) {
      res.status(500).json({ error: 'Error processing like' });
  }
});

router.post('/requirementlike/:postId', async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  try {
      const existingLike = await RequirementLike.findOne({ where: { userId, postId } });
      
      if (existingLike) {
          await existingLike.destroy(); // Unlike
          await Requirement.decrement('likes', { where: { id: postId } }); // Decrement likes count
          return res.json({ message: 'Unliked' });
      } else {
          await RequirementLike.create({ userId, postId }); // Like
          await Requirement.increment('likes', { where: { id: postId } }); // Increment likes count
          return res.json({ message: 'Liked' });
      }
      
  } catch (error) {
      res.status(500).json({ error: 'Error processing like' });
  }
});

router.post('/researchlike/:postId', async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  try {
      const existingLike = await ResearchLike.findOne({ where: { userId, postId } });
      
      if (existingLike) {
          await existingLike.destroy(); // Unlike
          await Research.decrement('likes', { where: { id: postId } }); // Decrement likes count
          return res.json({ message: 'Unliked' });
      } else {
          await ResearchLike.create({ userId, postId }); // Like
          await Research.increment('likes', { where: { id: postId } }); // Increment likes count
          return res.json({ message: 'Liked' });
      }
      
  } catch (error) {
      res.status(500).json({ error: 'Error processing like' });
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.query;
  console.log("Search query received: ", query); // Debugging

  try {
    const inventspaceResults = await inventspace.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    const requirementResults = await Requirement.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    const researchResults = await Research.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    const communityResults = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
        ],
      },
      include: {
        model: Community,
        as: 'community',
        attributes: ['name'],
      }
    });

    const results = {
      inventspace: inventspaceResults,
      requirements: requirementResults,
      research: researchResults,
      community: communityResults,
    };

    console.log("Search results found: ", results); // Debugging
    res.status(200).json(results);
  } catch (error) {
    console.error("Error during search: ", error); // Debugging
    res.status(500).json({ error: "An error occurred while searching" });
  }
});



router.post("/post-invent/:id", async (req, res) => {
  const { title, description } = req.body;
  const userId = req.params.id;
  console.log("title", title);
  console.log("userId: ", userId);
  await inventspace
    .create({ title, description, userId })
    .then((post) => res.status(201).json(post))
    .catch((err) => res.status(500).json(err));
});

router.post("/post-requirement/:id", async (req, res) => {
  const { title, description } = req.body;
  const userId = req.params.id;
  console.log("title", title);
  console.log("userId: ", userId);
  await Requirement.create({ title, description, userId })
    .then((post) => res.status(201).json(post))
    .catch((err) => res.status(500).json(err));
});

router.post("/post-research/:id", async (req, res) => {
  const { title, description } = req.body;
  const userId = req.params.id;
  console.log("title", title);
  console.log("userId: ", userId);
  await Research.create({ title, description, userId })
    .then((post) => res.status(201).json(post))
    .catch((err) => res.status(500).json(err));
});

router.get('/get-invent', async (req, res) => {
  try {
    // Fetch posts and include the associated User's username
    let posts = await inventspace.findAll({
      include: {
        model: User,
        as: 'user',
        attributes: ['username'], // Only include the username
      },
      order: [['createdAt', 'DESC']], // Order by createdAt in descending order (newest first)
    });
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/get-user-posts/:userId', async (req, res) => {
  const {userId} = req.params;
  try {
    let user = await User.findByPk(userId);
    if(user.type === "student"){
      let posts = await inventspace.findAll({where: {userId: userId}}, {
        include: {
          model: User,
          as: 'user',
          attributes: ['username'], // Only include the username
        },
        order: [['createdAt', 'DESC']], // Order by createdAt in descending order (newest first)
      });
      res.status(201).json(posts);
    }
    else if (user.type === "researcher"){
      let posts = await Research.findAll({where: {userId: userId}}, {
        include: {
          model: User,
          as: 'user',
          attributes: ['username'], // Only include the username
        },
        order: [['createdAt', 'DESC']], // Order by createdAt in descending order (newest first)
      });
      res.status(201).json(posts);
    } else if (user.type === "company") {
      let posts = await Requirement.findAll({where: {userId: userId}}, {
        include: {
          model: User,
          as: 'user',
          attributes: ['username'], // Only include the username
        },
        order: [['createdAt', 'DESC']], // Order by createdAt in descending order (newest first)
      });
      res.status(201).json(posts);
    } else {
      res.status(404).json({message: "User not found"})
    }
    
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/update-post/:userId/:postId', async (req, res) => {
  const { userId, postId } = req.params;
  const { title, description } = req.body;

  try {
    let user = await User.findByPk(userId);
    if (user.type === 'student') {
      let post = await inventspace.findByPk(postId);
      await post.update({ title, description });
      res.status(201).json(post);
    } else if (user.type === 'researcher') {
      let post = await Research.findByPk(postId);
      await post.update({ title, description });
      res.status(201).json(post);
    } else if (user.type === 'company') {
      let post = await Requirement.findByPk(postId);
      await post.update({ title, description });
      res.status(201).json(post);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/get-invent/:id', async (req, res) => {
  const {postId} = req.params;
  try {
    let post = await inventspace.findByPk(postId);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get("/get-requirements", async (req, res) => {
  try {
    // Fetch posts and include the associated User's username
    let posts = await Requirement.findAll({
      include: {
        model: User,
        as: 'user',
        attributes: ['username'], // Only include the username
      },
      order: [['createdAt', 'DESC']], // Order by createdAt in descending order (newest first)
    });
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-research", async (req, res) => {
  try {
    // Fetch posts and include the associated User's username
    let posts = await Research.findAll({
      include: {
        model: User,
        as: 'user',
        attributes: ['username'], // Only include the username
      },
      order: [['createdAt', 'DESC']], // Order by createdAt in descending order (newest first)
    });
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-communities-posts", async (req, res) => {
  try {
    // Fetch the 3 most recent posts, including the associated User's username
    let posts = await Post.findAll(
      {
      include: {
        model: Community,
        as: 'community',
        attributes: ['name'], // Only include the username
      },
      order: [['createdAt', 'DESC']], // Order by createdAt in descending order (newest first)
      limit: 7, // Limit the result to the three most recent posts
    }
    );
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-communities", async (req, res) => {
  try {
    let communities = await Community.findAll();
    res.status(201).json(communities);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-top-communities", async (req, res) => {
  try {
    const topCommunities = await Community.findAll({
      include: [
        {
          model: UserCommunity,
          attributes: [], // Exclude fields from the join table
          as: "user_communities", // Ensure correct alias
        },
      ],
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("user_communities.userId")),
            "memberCount",
          ], // Use correct alias
        ],
      },
      group: ["community.id"],
      subQuery: false, // Helps in avoiding subquery errors
    });
    res.status(200).json(topCommunities);
  } catch (error) {
    console.error("Error fetching topCommunities: ", error);
    res.status(500).json({ error: error.message });
  }
});

// routes/content.js

router.get("/get-posts-by-community/:communityId", async (req, res) => {
  const { communityId } = req.params;
  try {
    const community = await Community.findByPk(communityId);
    const posts = await Post.findAll({ where: { communityId } });
    res.status(200).json({ community, posts });
  } catch (error) {
    res.status(500).json({ error: "Error fetching community posts" });
  }
});

// //get specific post in specific community
// router.get("/get-post-by-community/:communityId/:postId", async (req, res) => {
//   const { communityId } = req.params.communityId;
//   const { postId } = req.params.postId;
//   try {
//     const community = await Community.findByPk(communityId);
//     const post = await Post.findByPk(postId);
//     res.status(200).json({ community, post });
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching community posts" });
//   }
// });

router.post("/post-in-community/:communityId/:userId", async (req, res) => {
  const { communityId, userId } = req.params;
  const { title, description } = req.body;
  try {
    const post = await Post.create({
      title,
      description,
      communityId,
      userId,
      authorId: userId,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/post-community", async (req, res) => {
  const { name, description, subject } = req.body;
  console.log("name: ", name);
  console.log("description: ", description);
  console.log("subject: ", subject);
  await Community.create({ name, description, subject })
    .then((com) => res.status(201).json(com))
    .catch((err) => res.status(500).json(err));
});

// Route to create a new Lnd entry
router.post('/lnd', async (req, res) => {
  const { title, date, description, location, limit, image } = req.body;

  if (!title || !date || !description || !location || !limit) {
    return res.status(400).json({ message: 'All fields except image are required.' });
  }

  try {
    // If an image is provided, convert it from Base64 to binary
    const imageBuffer = image ? Buffer.from(image, 'base64') : null;

    const newLnd = await Lnd.create({
      title,
      date,
      description,
      location,
      limit,
      image: imageBuffer
    });
    res.status(201).json({ message: 'Lnd event created successfully', lnd: newLnd });
  } catch (error) {
    console.error('Error creating Lnd:', error);
    res.status(500).json({ message: 'Error creating Lnd event' });
  }
});


// Route to retrieve all Lnd entries
router.get('/lnd', async (req, res) => {
  try {
    const lnds = await Lnd.findAll();

    // Convert image buffer to Base64 string
    const lndsWithImage = lnds.map(lnd => ({
      ...lnd.toJSON(),
      image: lnd.image ? `data:image/png;base64,${lnd.image.toString('base64')}` : null // Prefix the Base64 data
    }));

    res.status(200).json(lndsWithImage);
  } catch (error) {
    console.error('Error fetching Lnd events:', error);
    res.status(500).json({ message: 'Error fetching Lnd events' });
  }
});

// Route to retrieve a single Lnd entry by ID
router.get('/lnd/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const lnd = await Lnd.findByPk(id);

    if (!lnd) {
      return res.status(404).json({ message: 'Lnd event not found' });
    }

    // Convert image buffer to Base64 string
    const lndWithImage = {
      ...lnd.toJSON(),
      image: lnd.image ? `data:image/png;base64,${lnd.image.toString('base64')}` : null
    };

    res.status(200).json(lndWithImage);
  } catch (error) {
    console.error('Error fetching Lnd event:', error);
    res.status(500).json({ message: 'Error fetching Lnd event' });
  }
});


router.post('/lnd/:lndId/apply', async (req, res) => {
  const { userId } = req.body; // ID of the user applying
  const { lndId } = req.params; // ID of the Lnd event

  try {
    // Check if the user has already applied
    const existingApplication = await UserLnd.findOne({
      where: { userId, lndId }
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'User has already applied to this event.' });
    }

    // Create the application
    const application = await UserLnd.create({
      userId,
      lndId
    });

    // Increment the registration count for the Lnd event
    await Lnd.increment('registrationCount', { where: { id: lndId } });

    res.status(201).json({ message: 'Application successful', application });
  } catch (error) {
    console.error('Error applying to Lnd event:', error);
    res.status(500).json({ message: 'Error applying to event' });
  }
});

router.get('/lnd/:lndId/applicants', async (req, res) => {
  const { lndId } = req.params;

  try {
    const applicants = await UserLnd.findAll({
      where: { lndId },
      include: [{ model: User, attributes: ['id', 'username', 'email'] }] // Adjust attributes as needed
    });

    res.status(200).json(applicants);
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({ message: 'Error fetching applicants' });
  }
});

router.get('/user/:userId/applications', async (req, res) => {
  const { userId } = req.params;

  try {
    const applications = await UserLnd.findAll({
      where: { userId },
      include: [{ model: Lnd, attributes: ['id', 'title', 'date', 'location'] }] // Adjust attributes as needed
    });

    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});



module.exports = router;
