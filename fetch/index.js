const AppServer = require('./bin/app/server');
const configs = require('./bin/infra/configs/global_config');
const logger = require('./bin/helpers/utils/logger');
const appServer = new AppServer();
const port = configs.get('/port') || 1337;

appServer.server.listen(port, () => {
  logger.log('app-listen', `${appServer.server.name} started at ${appServer.server.url}`, 'initate app');
});
