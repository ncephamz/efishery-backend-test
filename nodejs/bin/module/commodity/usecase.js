const Repository = require('./repository');
const wrapper = require('../../helpers/utils/wrapper');
const logger = require('../../helpers/utils/logger');
const { baseUrlSourceData } = require('../../helpers/utils/constant');
const { InternalServerError } = require('../../helpers/error');

class Usecase {
  constructor(SteinHq) {
    this.repository = new Repository(SteinHq);
    this.ctx = __filename;
  }

  async findAllCommodities(){
    let { err, data } = await this.repository.findAll(baseUrlSourceData.COMMODITIES);
    if (err) {
      logger.error(this.ctx, err, 'findAllCommodities()');
      return wrapper.error(new InternalServerError(err));
    }

    return wrapper.data({ commodities: data });
  }
}

module.exports = Usecase;
