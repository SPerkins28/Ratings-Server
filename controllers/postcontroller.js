const router = require("express").Router();
const { Post } = require("../models/post");
const validateSession = require('../middleware/validateSession')



//* UPDATE
router.put("/update/:id", validateSession, async (req, res) => {
    const updatePostEntry = {
        title: req.body.post.title,
        date: req.body.post.date,
        entry: req.body.post.entry,
        rating: req.body.post.rating
    };

    const query = { where: { id: req.params.id, owner: req.user.id } };
  
    Post.update(updatePostEntry, query)
        .then((posts) => res.status(200).json({
            updatePostEntry,
            message: "Rating successfully updated!"}))
        .catch((err) => res.status(500).json({ error: err}));
});
  
  //* DELETE
  
  router.delete("/delete/:id", validateSession, async(req, res) => {
    const query = { where: {id: req.params.id, owner: req.user.id } };
  
    Post.destroy(query)
        .then(() => res.status(200).json({message: "Rating Removed" }))
        .catch((err) => res.status(500).json({error: err}));
  });
  
  module.exports = router;
