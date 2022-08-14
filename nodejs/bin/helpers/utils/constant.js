const responseMessages = {
  TOKEN: {
    401: 'Access token expired!',
    403: 'Invalid token!',
    400: 'Token is not valid!'
  },
  AUTH: {
    GENERATE_TOKEN: {
      200: 'generate token has been succesfully',
      401: 'invalid username or password',
    },
    REGISTRATION: {
      201: 'registration has been succesfully'
    },
    PHONE: {
      400: 'Phone already registered'
    },
    PRIVATE_CLAIM: {
      200: 'private claim has been succesfully'
    }
  },
};

const general = {
  FAIL: 'fail',
  SUCCESS: 'success'
};

const baseUrlSourceData = {
  COMMODITIES: 'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list',
  DETAIL: 'http://dev3.dansmultipro.co.id/api/recruitment/positions/'
};

const sheetNames = {
  USERS: 'users'
};

module.exports = {
  responseMessages,
  general,
  baseUrlSourceData,
  sheetNames
};