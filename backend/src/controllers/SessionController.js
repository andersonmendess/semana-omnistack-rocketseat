const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if(!user){
      user = await User.create({ email });
    }

    return res.json(user);
  }
}