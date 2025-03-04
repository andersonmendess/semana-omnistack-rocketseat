const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
     const { tech } = req.query;

     const spots = await Spot.find({ techs: tech });

     return res.json(spots);
  },
  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user } = req.headers;

    const userExists = await User.findById(user);

    if (!userExists) {
      return res.status(400).json({ error: 'user not found' })
    }

    const spot = await Spot.create({
      user,
      thumbnail: filename,
      company,
      price,
      techs: techs.split(',').map(tech => tech.trim())
    });

    res.json(spot)
  }
}