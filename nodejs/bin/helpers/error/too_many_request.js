class TooManyRequest {
  constructor(param = 'Too_Many_Request') {
    this.message = param.message || param;
    this.data = param.data;
    this.code = param.code;
  }
}

module.exports = TooManyRequest;
