const express = require("express");
const User = require("../models/User");
const router = express.Router();
const inventspace = require("../models/InventSpace");

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

router.get("/get-invent", async (req, res) => {
  try {
    let posts = await inventspace.findAll();
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
