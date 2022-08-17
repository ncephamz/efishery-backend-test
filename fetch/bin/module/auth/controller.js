const Usecase = require('./usecase');
const model = require('./model');
const validator = require('../../helpers/utils/validator');
const wrapper = require('../../helpers/utils/wrapper');
const {
  responseMessages,
  general: {
    FAIL,
    SUCCESS
  }
} = require('../../helpers/utils/constant');
const SteinHq = require('../../helpers/stein-hq/stein');

const usecase = new Usecase(SteinHq);

const registration = async (req, res) => {
  const validatePayload = await validator.isValidPayload(req.body, model.schemaRegistration());
  if (validatePayload.err) {
    return wrapper.response(res, FAIL, validatePayload, validatePayload.err.message);
  }

  const result = await usecase.registration(validatePayload.data);
  if (result.err) {
    return wrapper.response(res, FAIL, result, result.err.message);
  }

  return wrapper.response(res, SUCCESS, result, responseMessages.AUTH.REGISTRATION[201]);
};

const generateToken = async (req, res) => {
  const validatePayload = await validator.isValidPayload(req.body, model.schemaGenerateToken());
  if (validatePayload.err) {
    return wrapper.response(res, FAIL, validatePayload, validatePayload.err.message);
  }

  const result = await usecase.generateToken(validatePayload.data);
  if (result.err) {
    return wrapper.response(res, FAIL, result, result.err.message);
  }

  return wrapper.response(res, SUCCESS, result, responseMessages.AUTH.GENERATE_TOKEN[200]);
};

const privateClaim = async (req, res) => {
  const result = {
    err: null,
    data: req.privateClaim
  };
  return wrapper.response(res, SUCCESS, result, responseMessages.AUTH.PRIVATE_CLAIM[200]);
};

module.exports = {
  registration,
  generateToken,
  privateClaim
};
