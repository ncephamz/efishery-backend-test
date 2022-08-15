const responseMessages = {
  TOKEN: {
    401: 'Access token expired!',
    403: 'Invalid token!',
    400: 'Token is not valid!'
  },
  AUTH: {
    GENERATE_TOKEN: {
      200: 'generate token has been succesfully',
      401: 'invalid phone or password',
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
  COMMODITIES: {
    ALL: {
      200: 'find commoditites has been succesfully'
    },
    AGGREGATE: {
      200: 'aggregate commoditites has been succesfully'
    },
  },
  ROLE: {
    403: 'do not have access to this resource'
  }
};

const general = {
  FAIL: 'fail',
  SUCCESS: 'success'
};

const baseUrlSourceData = {
  COMMODITIES: 'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list',
  CURRENCY: 'https://free.currconv.com/api/v7/convert'
};

const sheetNames = {
  USERS: 'users'
};

const roles = {
  ADMIN: 'admin'
};

module.exports = {
  responseMessages,
  general,
  baseUrlSourceData,
  sheetNames,
  roles
};