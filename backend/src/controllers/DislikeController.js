const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { id } = req.params;

    const loggedDev = await Dev.findById(user);
    const likedDev = await Dev.findById(id);

    if(!likedDev){
      return res.status(404).json({message: "User not found"});
    }

    if(loggedDev.dislikes.includes(likedDev._id)){
      return res.json({msg: "Already disliked this user"});
    }

    loggedDev.dislikes.push(likedDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }

}
