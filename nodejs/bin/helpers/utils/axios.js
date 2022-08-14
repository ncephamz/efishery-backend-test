const axios = require('axios');

class Axios {
  async get(url){
    try {
      return await axios.get(url);
    } catch (error) {
      return error;
    }
  }
}

module.exports = Axios;