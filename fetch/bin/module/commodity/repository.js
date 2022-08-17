const wrapper = require('../../helpers/utils/wrapper');

class Repository {
  constructor(Axios) {
    this.axios = new Axios();
  }

  async fetchUrl(url) {
    const { err, data } = await this.axios.get(url);
    if (err) {
      return wrapper.error(err);
    }
    return wrapper.data(data)
  }
}

module.exports = Repository;
