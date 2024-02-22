const { User, Thought} = require('../models');

module.exports = {

  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      console.log(users);
      const userData = JSON.parse(JSON.stringify(users));
      res.json(userData);
    } catch (err) { console.log(err);
      res.status(500).json(err);
    }
  },

  // get a single user
  async getSingleUser(req, res) {
    try {
      console.log('single user')
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) { console.log(err);
      res.status(500).json(err);
    }
  },

  // create / POST a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) { console.log(err);
      res.status(500).json(err);
    }
  },

  // update / PUT a user by id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        // { runValidators: true, new: true },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    }
    catch (err) { console.log(err);
      res.status(500).json(err);
    }
  },

  // delete a user by id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
     await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) { console.log(err);
      res.status(500).json(err);
    }
  },

  // add / POST a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) { console.log(err);
      res.status(500).json(err);
    } 
  },

  // delete to remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) { console.log(err);
      res.status(500).json(err);
    }
  }
};
