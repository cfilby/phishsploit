'use strict';

/**
 * Module repsonsible for providing configuration and environment specific data.
 * @module phishsploit/config/config
 */

let environment = process.env.NODE_ENV || 'development';
let config = {};

config.page = {
  size: 25,
  paginationRange: 7
}

// Set Config options based on the NODE_ENV environment variable.
switch (environment) {
  case 'production':
    config.db = {
      host: 'localhost',
      port: 5432,
      database: 'phishsploit',
      user: 'phishsploit',
      password: process.env.DB_PASS
    };

    config.http = {
      port: 3000
    };
    break;
  case 'development':
    config.db = {
      host: 'localhost',
      port: 5432,
      database: 'cfilby',
      user: 'cfilby',
      password: ''
    };

    config.http = {
      port: 3000
    };
    break;
  case 'testing':
    config.db = {
      host: 'localhost',
      port: 5432,
      database: 'cfilby',
      user: 'cfilby',
      password: ''
    };

    config.http = {
      port: 3000
    };
    break;
  default:
    throw new Error('Environment ' + environment + 'is not valid.');
    break;
}

export default config;
