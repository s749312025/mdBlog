const path = require('path');
const qs = require('think-qs')
const isDev = think.env === 'development';

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {
      defaultController: 'content',
      defaultAction: 'index'
    }
  },
  {
    handle: 'payload'
  },
  {
    handle: qs,
    options: {

    }
  },
  'logic',
  'controller'
];
