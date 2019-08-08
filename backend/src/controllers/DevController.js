const github = require('../services/github');
const Dev = require('../models/Dev');

module.exports = {

  async index(req, res) {
    const { user } = req.headers;

    const loggedUser = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedUser.likes } },
        { _id: { $nin: loggedUser.dislikes } },
      ]
    });

    return res.json(users);
  },

  async store(req, res) {
    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });

    if (userExists) {
      return res.json(userExists);
    }

    const githubData = await github.getUserData(username);

    if (githubData) {
      const { name, bio, avatar_url: avatar } = githubData;
      const dev = await Dev.create({ name, user: username, bio, avatar });

      return res.json(dev);
    }

    return res.status(404).json({ message: "User not found" });
  }
}
