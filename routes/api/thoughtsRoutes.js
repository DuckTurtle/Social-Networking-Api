const router = require('express').Router();
const {
    getThoughts,
    getAThought,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    newReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

// /api/thoughts
router
    .route('/')
    .get(getThoughts)

// /api/thoughts/:userId
router
    .route('/:userId')
    .post(createThoughts);

// /api/thoughts/:id
router
    .route('/:id')
    .get(getAThought)
    .put(updateThoughts);

// /api/thoughts/:userId/:thoughtId
router
    .route('/:userId/:thoughtId')
    .delete(deleteThoughts);

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(newReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;