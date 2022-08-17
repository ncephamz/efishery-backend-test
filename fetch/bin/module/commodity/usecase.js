const Repository = require('./repository');
const wrapper = require('../../helpers/utils/wrapper');
const logger = require('../../helpers/utils/logger');
const config = require('../../infra/configs/global_config');
const { baseUrlSourceData } = require('../../helpers/utils/constant');
const { InternalServerError } = require('../../helpers/error');
const groupArray = require('group-array');
const moment = require('moment');
const { median } = require('../../helpers/utils/common');

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

  async aggregateCommodities(){
    let { err, data } = await this.repository.fetchUrl(baseUrlSourceData.COMMODITIES);
    if (err) {
      logger.error(this.ctx, err, 'aggregateCommodities()');
      return wrapper.error(new InternalServerError(err));
    }

    let week = null;

    data = groupArray(data.data, 'area_provinsi');

    for (const value in data) {
      week = moment(data[value][0].tgl_parsed).add(7, 'days');

      data[value] = data[value].map(row => {
        if (moment(row.tgl_parsed).isBefore(week)) {
          row.week = `${moment(moment(week).subtract(7, 'days')).format('YYYY-MM-DD')} - ${moment(week).format('YYYY-MM-DD')}`;
        } else {
          week = moment(week).add(7, 'days');
          row.week = `${moment(moment(week).subtract(7, 'days')).format('YYYY-MM-DD')} - ${moment(week).format('YYYY-MM-DD')}`;
        }
        return row;
      });
      
      data[value] = groupArray(data[value], 'week');

      for (const value2 in data[value]) {

        const sizes = data[value][value2].map(item => Number(item.size));
        const prices = data[value][value2].map(item => Number(item.price));

        data[value][value2] = {
          size: {
            min: Math.min(...sizes),
            max: Math.max(...sizes),
            avg: sizes.reduce((a, b) => a + b, 0) / sizes.length,
            med: median(sizes)
          },
          price: {
            min: Math.min(...prices),
            max: Math.max(...prices),
            avg: prices.reduce((a, b) => a + b, 0) / prices.length,
            med: median(prices)
          }
        }
      }
    }
    
    return wrapper.data({ data });
  }
}

module.exports = Usecase;
