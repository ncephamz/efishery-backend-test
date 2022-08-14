const jwt = require('jsonwebtoken');
const config = require('../infra/configs/global_config');
const wrapper = require('../helpers/utils/wrapper');
const { ERROR } = require('../helpers/http-status/status_code');
const { UnauthorizedError, ForbiddenError } = require('../helpers/error');
const { responseMessages, general: { FAIL } } = require('../helpers/utils/constant');
const secretKey = config.get('/secretKey');

const generateToken = async (payload, expiresIn = '24h') => {
  const verifyOptions = {
    expiresIn
  };

  const token = jwt.sign(payload, secretKey.jwt, verifyOptions);
  return token;
};

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return undefined;
};

const verifyToken = async (req, res, next) => {
  const result = {
    err: null,
    data: null
  };

  const token = getToken(req.headers);
  if (!token) {
    result.err = new ForbiddenError(responseMessages.TOKEN[403]);
    return wrapper.response(res, FAIL, result, responseMessages.TOKEN[403], ERROR.FORBIDDEN);
  }

  try {
    const decodedToken = await jwt.verify(token, secretKey.jwt);

    req.privateClaim = decodedToken;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      result.err = new UnauthorizedError(responseMessages.TOKEN[401]);
      return wrapper.response(res, FAIL, result, responseMessages.TOKEN[401], ERROR.UNAUTHORIZED);
    }

    result.err = new UnauthorizedError(responseMessages.TOKEN[400]);
    return wrapper.response(res, FAIL, result, responseMessages.TOKEN[400], ERROR.UNAUTHORIZED);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
