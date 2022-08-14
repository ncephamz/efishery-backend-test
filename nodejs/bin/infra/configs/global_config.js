require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT,
  secretKey: {
    jwt: process.env.SECRET_JWT,
    encryptPasswordProfile: process.env.SECRET_ENCRYPT_PASSWORD_PROFILE,
  },
  steinHqUrl: process.env.STEIN_HQ_URL,
  steinHqUsername: process.env.STEIN_HQ_USERNAME,
  steinHqPassword: process.env.STEIN_HQ_PASSWORD,
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);
