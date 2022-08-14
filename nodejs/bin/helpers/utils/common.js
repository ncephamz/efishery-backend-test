
const crypto = require('crypto');
const moment = require('moment');
const idLocale = require('moment/locale/id');
moment.locale('id', idLocale);

const encrypt = async (text, algorithm, secretKey) => {
  const cipher = crypto.createCipher(algorithm, secretKey);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

const decrypt = async (text, algorithm, secretKey) => {
  const decipher = crypto.createDecipher(algorithm, secretKey);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

module.exports = {
  encrypt,
  decrypt,
};
