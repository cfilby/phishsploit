'use strict';

/**
 * Module responsible for aggregating and exporting controller router objects.
 * @module phishsploit/controllers/index
 */

import Promise from 'bluebird';
import express from 'express';

import {
  Exploit, Phish
}
from '../models/index';

import about from './about';
import exploit from './exploit';
import frequency from './frequency';
import phish from './phish';
import search from './search';

let router = express.Router();

/**
 * @api {get} / Get Home pages
 * @apiName getHome
 * @apiGroup Home
 *
 * @apiDescription
 * Get the dashboard data.
 *
 * @apiSuccess {object} Response object
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 I  "phishCount": {
 *    "count": "160162"
 *  },
 *  "exploitCount": {
 *    "count": "33999"
 *  },
 *  "exploitPhishCount": {
 *    "count": "1266"
 *  },
 *  "interestingExploits": [
 *    {
 *      "exploitId": 37604,
 *      "description": "SO Planning 1.32 - Multiple Vulnerabilities",
 *      "date": "2015-07-13T05:00:00.000Z",
 *      "author": "Huy-Ngoc DAU",
 *      "platform": "php",
 *      "type": "webapps",
 *      "port": 80
 *    }
 *  ]
 * }
 */
router.get('/',
  /**
   * Get the dashboard contents.
   * @param  {Express.Request} req Express Request
   * @param  {Express.Response} res Express Response
   * @param  {Function} next Express Next function
   * @return {Object} Formatted response
   * @function getHome
   */
  function getHome(req, res, next) {
    Promise.props({
      phishCount: Phish.getCount(),
      exploitCount: Exploit.getCount(),
      exploitPhishCount: Exploit.getExploitPhishCount(),
      interestingExploits: Exploit.getInterestingExploits()
    }).then(function(homeObj) {
      return res.format({
        text: function() {
          return res.send(JSON.stringify(homeObj));
        },
        html: function() {
          return res.render('pages/home', homeObj);
        },
        json: function() {
          return res.json(homeObj)
        }
      });
    }).catch(function(err) {
      if (typeof err !== Error) {
        err = new Error(err);
      }

      return next(err);
    });
  });

router.use('/about', about);
router.use('/exploits', exploit);
router.use('/frequency', frequency);
router.use('/phish', phish);
router.use('/search', search);

export default router;
