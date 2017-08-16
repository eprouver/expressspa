var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = require('dotenv').config().parsed;

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'expressspa'
    },
    port: env.port || 3000,
    db: 'mongodb://localhost/expressspa-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'expressspa'
    },
    port: env.port || 3000,
    db: 'mongodb://localhost/expressspa-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'expressspa'
    },
    port: env.port || 3000,
    db: 'mongodb://localhost/expressspa-production'
  }
};

module.exports = config[env.NODE_ENV];
