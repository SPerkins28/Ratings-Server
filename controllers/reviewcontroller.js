const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validateSession');
const Review = require('../db').import('../models/review')

router.get('/revtest', validateSession, function(req, res) {
    res.send('Hey!! This is a revtest route')
});

router.post('/create', validateSession, (req, res) => {
    const reviewEntry = {
        title: req.body.review.title,
        date: req.body.review.date,
        entry: req.body.review.entry,
        rating: req.body.review.rating,
        owner: req.user.id
    }
    Review.create(reviewEntry)
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({ error: err }))
});
    
router.get('/', (req, res) => {
    Review.findAll() 
        .then(reviews => res.status(200).json(reviews))
        .catch(err => res.status(500).json({ error: err }))
});

router.get('/mine', validateSession, (req, res) => {
    let userid = req.user.id
    Review.findAll({
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

router.put('/update/:entryId', validateSession, function (req, res) {
    const updateReviewEntry = {
        title: req.body.review.title, 
        date: req.body.review.date,
        entry: req.body.review.entry,
        rating: req.body.review.rating
    };

    const query = { where: { id: req.params.entryId, owner: req.user.id}}

    Review.update(updateReviewEntry, query)
        .then((reviews) => res.status(200).json(reviews))
        .catch((err) => res.status(500).json({ error: err }));
});

router.delete('/delete/:id', validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id }};

    Review.destroy(query)
        .then(() => res.status(200).json({ message: 'Movie Review Entry Removed'}))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
