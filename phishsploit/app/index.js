'use strict';

/**
 * Main entry point for the PhishSploit application.
 * @module phishsploit/index
 */

import http from 'http';
import config from './config/config';

import createApp from './config/app';

let app = createApp(config);

let server = app.listen(config.http.port, function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log('PhishSploit listening at http://%s:%s', host, port);
});
