const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const project = require('../../package.json');
const jwtAuth = require('../auth/jwt_auth_helper');
const wrapper = require('../helpers/utils/wrapper');

// import handler here
const authController = require('../module/auth/controller');
const commodityController = require('../module/commodity/controller');

function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });

  this.server.serverKey = '';
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.authorizationParser());

  // required for CORS configuration
  const corsConfig = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    // ['*'] -> to expose all header, any type header will be allow to access
    // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
  });
  this.server.pre(corsConfig.preflight);
  this.server.use(corsConfig.actual);

  // check healt
  this.server.get('/', (req, res) => {
    wrapper.response(res, 'success', wrapper.data('Index'), 'This service is running properly');
  });

  // list endpoint
  this.server.post('/auth/v1/registration', authController.registration);
  this.server.post('/auth/v1/token', authController.generateToken);
  this.server.get('/auth/v1/private-claim', jwtAuth.verifyToken, authController.privateClaim);

  this.server.get('/commodities/v1/all', jwtAuth.verifyToken, commodityController.findAllCommodities);

}

module.exports = AppServer;
