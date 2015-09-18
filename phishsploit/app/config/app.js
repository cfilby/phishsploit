'use strict';

/**
 * Module responsible for initalizing and creating the Express App.
 * @module phishsploit/config/app
 */

import * as path from 'path';

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';

import controllers from '../controllers/index.js';

export default function createApp(config) {
  let app = express();

  // Set View Folder and Templating Engine
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'ejs');

  // Set Middleware
  app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // Load App Routes
  app.use('/', controllers);
  app.use('/api', express.static(path.join(__dirname, '..', 'api')));


  // Middleware that's invoked when to matching route is found.
  app.use(function(req, res, next) {
    let err = new Error('Page not found.');
    err.status = 404;
    return next(err);
  });

  // Middleware invoked when an error is passed to next.
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.format({
      text: function() {
        res.send(err.message);
      },

      html: function() {
        res.render('pages/error', {
          message: err.message,
          error: err,
          stack: err.stack
        });
      },

      json: function() {
        return res.json(err);
      }
    });

  });

  return app;
}
