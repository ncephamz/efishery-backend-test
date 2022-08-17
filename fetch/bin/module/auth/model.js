const joi = require('joi');

const schemaRegistration = () => {
  return joi.object({
    phone: joi.string().min(9).max(13).regex(/^08[0-9]{9,}$/).required(),
    name: joi.string().required(),
    role: joi.string().required(),
  });
};

const schemaGenerateToken = () => {
  return joi.object({
    phone: joi.string().min(9).max(13).required(),
    password: joi.string().min(4).max(4).required(),
  });
};

module.exports = {
  schemaRegistration,
  schemaGenerateToken,
};
