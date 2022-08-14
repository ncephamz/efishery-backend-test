const { NotFoundError, InternalServerError, BadRequestError, ConflictError, ExpectationFailedError,
  ForbiddenError, GatewayTimeoutError, ServiceUnavailableError, UnauthorizedError } = require('../error');
const { ERROR:httpError, SUCCESS: http } = require('../http-status/status_code');

const data = (data) => ({ err: null, data});

const error = (err) => ({ err, data: {} });

const response = (res, type, result, message = '', responseCode = http.OK) => {
  let status = true;
  let data = result.data; 
  let code = responseCode;
  if(type === 'fail'){
    const errCode = checkErrorCode(result.err);
    status = false;
    data = result.err.data || '';
    message = result.err.message || message;
    code = result.err.code || errCode ;
    responseCode = errCode;
  }
  res.send(responseCode,
    {
      success: status,
      data,
      message,
      code
    });
};

const checkErrorCode = (error) => {

  switch (error.constructor) {
  case BadRequestError:
    return httpError.BAD_REQUEST;
  case ConflictError:
    return httpError.CONFLICT;
  case ExpectationFailedError:
    return httpError.EXPECTATION_FAILED;
  case ForbiddenError:
    return httpError.FORBIDDEN;
  case GatewayTimeoutError:
    return httpError.GATEWAY_TIMEOUT;
  case InternalServerError:
    return httpError.INTERNAL_ERROR;
  case NotFoundError:
    return httpError.NOT_FOUND;
  case ServiceUnavailableError:
    return httpError.SERVICE_UNAVAILABLE;
  case UnauthorizedError:
    return httpError.UNAUTHORIZED;
  default:
    return httpError.CONFLICT;
  }

};

module.exports = {
  data,
  error,
  response,
};
