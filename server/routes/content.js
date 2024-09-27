const express = require("express");
const User = require("../models/User");
const router = express.Router();
const inventspace = require("../models/InventSpace");
const Requirement = require("../models/Requirement");
const Research = require("../models/Research");
const { Op } = require("sequelize");
const Community = require("../models/Community");
const UserCommunity = require("../models/UserCommunity");

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

    const communityResults = await Community.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
          { subject: { [Op.iLike]: `%${query}%` } },
        ],
      },
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

router.get("/get-invent", async (req, res) => {
  try {
    let posts = await inventspace.findAll();
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-requirements", async (req, res) => {
  try {
    let posts = await Requirement.findAll();
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-research", async (req, res) => {
  try {
    let posts = await Research.findAll();
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-communities", async (req, res) => {
  try {
    const communities = await Community.findAll({
      include: [
        {
          model: UserCommunity,
          attributes: [], // Exclude fields from the join table
        },
      ],
      attributes: {
        include: [
          [sequelize.fn("COUNT", sequelize.col("user_community.userId")), "memberCount"],
        ],
      },
      group: ["community.id"], // Group by community ID to aggregate the count
    });

    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

module.exports = router;
