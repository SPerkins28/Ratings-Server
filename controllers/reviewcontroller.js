const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const validateSession = require('../middleware/validateSession');

router.get('/practice', (req, res) => res.send('Hey!! This is a practice route'));

/****************************
  **** REVIEW CREATE ****
***************************/

router.post('/create', validateSession, async (req, res) => {
    
    const reviewEntry = {
        title: req.body.review.title,
        date: req.body.review.date,
        entry: req.body.review.entry,
        rating: req.body.review.rating,
    }
    Review.create(reviewEntry)
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({ error: err }))
});

router.get("/", (req, res) => {
    Review.findAll ()
        .then(reviews => res.status(200).json(reviews))
        .catch(err => res.status(500).json({ error: err }))
});

router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Review.findAll ({
        where: { owner: userid }
    })
        .then(reviews => res.status(200).json(reviews))
        .catch(err => res.status(500).json({ error: err }))
});

router.get('/:title', function (req, res) {
    let title = req.params.title;

    Review.findAll({
        where: { title: title}
    })
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router;


