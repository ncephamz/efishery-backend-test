const Repository = require('./repository');
const config = require('../../infra/configs/global_config');
const wrapper = require('../../helpers/utils/wrapper');
const logger = require('../../helpers/utils/logger');
const common = require('../../helpers/utils/common');
const jwtAuth = require('../../auth/jwt_auth_helper');
const randomstring = require("randomstring");
const { responseMessages, sheetNames } = require('../../helpers/utils/constant');
const { InternalServerError, NotFoundError, UnauthorizedError, BadRequestError } = require('../../helpers/error');
const { v4: uuidv4 } = require('uuid');

class Usecase {
  constructor(SteinHq) {
    this.repository = new Repository(SteinHq);
    this.ctx = __filename;
    this.secretKey = config.get('/secretKey');
  }

  async registration({ phone, name, role }){
    let { err, data } = await this.repository.findByPhone(sheetNames.USERS, { phone });
    if (data.length > 0) {
      return wrapper.error(new BadRequestError(responseMessages.AUTH.PHONE[400]));
    }

    const password = randomstring.generate(4);

    const user = {
      id: uuidv4(),
      phone,
      name,
      role,
      password: await common.encrypt(password, 'aes-256-cbc', this.secretKey.encryptPasswordProfile),
      createdAt: new Date()
    };

    ({ err } = await this.repository.registration(sheetNames.USERS, user));
    if (err) {
      logger.error(this.ctx, err, 'registration()');
      return wrapper.error(new InternalServerError(err));
    }

    return wrapper.data({ phone, password });
  }

  async generateToken({ phone, password }){
    let { err, data } = await this.repository.findByPhone(sheetNames.USERS, { phone });
    if (err) {
      logger.error(this.ctx, err, 'generateToken()');
      return wrapper.error(new InternalServerError(err));
    }
    if (data.length === 0) {
      return wrapper.error(new NotFoundError());
    }

    const decryptPassword = await common.decrypt(data[0].password, 'aes-256-cbc', this.secretKey.encryptPasswordProfile);
    if (decryptPassword !== password) {
      return wrapper.error(new UnauthorizedError(responseMessages.AUTH.GENERATE_TOKEN[401]));
    }

    console.log(data)
    return wrapper.data({
      token: await jwtAuth.generateToken({ name: data[0].name, phone, role: data[0].role, createdAt: data[0].created_at }),
    });
  }
}

module.exports = Usecase;
