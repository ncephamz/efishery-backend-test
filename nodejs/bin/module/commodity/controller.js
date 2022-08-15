const Usecase = require('./usecase');
const wrapper = require('../../helpers/utils/wrapper');
const {
  responseMessages,
  general: {
    FAIL,
    SUCCESS
  }
} = require('../../helpers/utils/constant');
const Axios = require('../../helpers/utils/axios');

const usecase = new Usecase(Axios);

const findAllCommodities = async (req, res) => {
  const result = await usecase.findAllCommodities();
  if (result.err) {
    return wrapper.response(res, FAIL, result, result.err.message);
  }

  return wrapper.response(res, SUCCESS, result, responseMessages.COMMODITIES.ALL[200]);
};

const aggregateCommodities = async (req, res) => {
  const result = await usecase.aggregateCommodities();
  if (result.err) {
    return wrapper.response(res, FAIL, result, result.err.message);
  }

  return wrapper.response(res, SUCCESS, result, responseMessages.COMMODITIES.AGGREGATE[200]);
};

module.exports = {
  findAllCommodities,
  aggregateCommodities
};
