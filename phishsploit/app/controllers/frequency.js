'use strict';

/**
 * Module containing Frequency API calls.
 * @module phishsploit/controllers/frequency
 */

import Promise from 'bluebird';
import express from 'express';

import config from '../config/config';
import {
  Phish
}
from '../models/index';

let router = express.Router();

/**
 * @api {get} /frequency Get Path Frequencies
 * @apiName getFrequencies
 * @apiGroup Frequency
 *
 * @apiParam {number} [page] number of the page to request
 *
 * @apiDescription
 * Get a list of frequency objects.
 *
 * @apiSuccess {object} Response object
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "frequencies": [
 *    {
 *      "pathPart": "/",
 *      "pathCount": "64061"
 *    },
 *    {
 *      "pathPart": "/wp-content",
 *      "pathCount": "10569"
 *    },
 *    {
 *      "pathPart": "/index.php",
 *      "pathCount": "8428"
 *    }, ...
 *  ],
 *  "total": {
 *    "count": "160162"
 *  },
 *  "page": {
 *    "current": 1,
 *    "size": 25,
 *    "range": 7,
 *    "route": "/frequency"
 *  }
 * }
 */
router.get('/',
  /**
   * Get a fixed number of Path Frequencies.
   * @param  {Express.Request} req Express Request
   * @param  {Express.Response} res Express Response
   * @param  {Function} next Express Next function
   * @return {Object} Formatted response
   * @getFrequencies
   */
  function getFrequencies(req, res, next) {
    let page = req.query.page || 1;
    let limit = config.page.size;

    Promise.props({
      frequencies: Phish.getPartFrequencies(limit, (page - 1) * limit),
      total: Phish.getCount(),
      page: {
        current: parseInt(page),
        size: limit,
        range: config.page.paginationRange,
        route: '/frequency'
      }
    }).then(function(frequencyObj) {
      return res.format({
        text: function() {
          return res.send(JSON.stringify(frequencyObj));
        },

        html: function() {
          return res.render('pages/frequency', frequencyObj);
        },

        json: function() {
          return res.json(frequencyObj);
        }
      });
    }).catch(function(err) {
      if (typeof err !== Error) {
        err = new Error(err);
      }

      return next(err);
    });
  });

export default router;
