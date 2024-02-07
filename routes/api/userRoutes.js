const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
// GET all users and POST a new user
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
// GET a single user, PUT to update a user, and DELETE a user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
// POST to add a new friend and DELETE to remove a friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
