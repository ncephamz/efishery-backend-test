const axios = require('axios');
const wrapper = require('./wrapper');

class Axios {
  async get(url){
    try {
      return wrapper.data(await axios.get(url));
    } catch (error) {
      return wrapper.error(error.response.data.error);
    }
  }
}

module.exports = Axios;