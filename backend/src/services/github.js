const axios = require('axios');

const api = axios.create({
  baseURL: "https://api.github.com"
})

module.exports = {
  async getUserData(user) {
    try {
      const userdata = await api.get(`/users/${user}`);
      return userdata.data
    } catch (e) { }
    return false;
  }
}
