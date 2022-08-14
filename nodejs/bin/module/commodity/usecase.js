const Repository = require('./repository');
const wrapper = require('../../helpers/utils/wrapper');
const logger = require('../../helpers/utils/logger');
const config = require('../../infra/configs/global_config');
const { baseUrlSourceData } = require('../../helpers/utils/constant');
const { InternalServerError } = require('../../helpers/error');

class Usecase {
  constructor(Axios) {
    this.repository = new Repository(Axios);
    this.ctx = __filename;
    this.currencyApiKey = config.get('/currencyApiKey');;
    this.usd = null;
  }

  async findAllCommodities(){
    let { err, data } = await this.repository.fetchUrl(baseUrlSourceData.COMMODITIES);
    if (err) {
      logger.error(this.ctx, err, 'findAllCommodities()');
      return wrapper.error(new InternalServerError(err));
    }

    let commodities = data.data;

    if (!this.usd) {
      ({ err, data } = await this.repository.fetchUrl(`${baseUrlSourceData.CURRENCY}?q=USD_IDR&apiKey=${this.currencyApiKey}`));
      if (err) {
        logger.error(this.ctx, err, 'findAllCommodities()');
        return wrapper.error(new InternalServerError(err));
      }

      this.usd = parseFloat(data.data.results.USD_IDR.val);
    }

    commodities = commodities.map((row) => {
      row.price_in_usd = row.price ? parseFloat(parseFloat(row.price) / this.usd).toFixed(2) : null;
      return row;
    });

    return wrapper.data({ commodities });
  }
}

module.exports = Usecase;
