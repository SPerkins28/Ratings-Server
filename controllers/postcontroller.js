const router = require("express").Router();
const { Post } = require("../models/post");
const validateSession = require('../middleware/validateSession')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//* UPDATE
router.put("/update/", validateSession, function (req, res) {
    const updatePostEntry = {
        title: req.body.post.title,
        date: req.body.post.date,
        entry: req.body.post.entry,
    };
  
    const query = { where: { id: req.params.entryId, owner: req.user.id } };
  
    post.update(updatePostEntry, query)
        .then((post) => res.status(200).json(post))
        .catch((err) => res.status(500).json({ error: err}));
  });
  
  //* DELETE
  
  router.delete("/delete/", validateSession, function (req, res) {
    const query = { where: {id: req.params.id, owner: req.user.id } };
  
    Post.destroy(query)
        .then(() => res.status(200).json({message: "Entry Removed" }))
        .catch((err) => res.status(500).json({error: err}));
  });
  
  module.exports = router;