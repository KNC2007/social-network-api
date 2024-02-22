const router = require('express').Router();
const {
 getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
// GET all thoughts and POST a new thought
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
// GET a single thought, PUT to update a thought, and DELETE a thought
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field and DELETE to pull and remove a reaction by the reaction's reactionId value
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
// DELETE to pull and remove a reaction by the reaction's reactionId value
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);



module.exports = router;
