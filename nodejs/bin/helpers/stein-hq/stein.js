const SteinStore = require("stein-js-client");
const config = require('../../infra/configs/global_config');
const wrapper = require('../utils/wrapper');

class SteinHq {
  constructor(){
    this.store = new SteinStore(config.get('/steinHqUrl'));
    this.username = config.get('/steinHqUsername');
    this.password = config.get('/steinHqPassword');
  }

  async find(sheet, query){
    try {
      return wrapper.data(
        await this.store.read(
          sheet, 
          {
            authentication: { username: this.username, password: this.password },
            ...query
          }
        )
      );
    } catch (error) {
      return wrapper.error(error);
    }
  }

  async create(sheet, payload){
    try {
      const result = await this.store.append(
        sheet,
        payload,
        { username: this.username, password: this.password }
      );
      
      if (result.error){
        return wrapper.error(result.error);
      }
      return wrapper.data(result);
    } catch (error) {
        return wrapper.error(error);
    }
  }
}

module.exports = SteinHq;