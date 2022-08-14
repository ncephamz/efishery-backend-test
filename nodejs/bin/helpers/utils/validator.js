const joi = require('joi');
const validate = require('validate.js');
const wrapper = require('./wrapper');
const { BadRequestError } = require('../error');

const isValidPayload = (payload, constraint) => {
  if (!payload) {
    return wrapper.error(new BadRequestError('Invalid request. Request body is undefined'));
  }
  const { value, error } = joi.validate(payload, constraint);
  if (!validate.isEmpty(error)) {
    const [detail] = error.details;
    const { path } = detail;
    const [errorField] = path;
    const message = `Not a valid ${errorField}`;
    return wrapper.error(new BadRequestError(message));
  }
  return wrapper.data(value);
};

module.exports = {
  isValidPayload,
};
