'use strict';

/**
 * Module containing Phish API calls.
 * @module phishsploit/controllers/phish
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
 * @api {get} /phish Get Phish
 * @apiName getPhish
 * @apiGroup Phish
 *
 * @apiParam {number} [page] number of the page to Request
 *
 * @apiDescription
 * Get a list of Phish objects.
 *
 * @apiSuccess {object} Response object
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "title": "Phish List",
 *  "phishes": [
 *    {
 *      "phishId": 3355,
 *      "importId": 3,
 *      "date": "2015-07-13T05:00:00.000Z",
 *      "baseUrl": "dotz.mais.goodfinedining.com",
 *      "fullUrl": "http://dotz.mais.goodfinedining.com/sd5f4as5dfsdfas56d4f6a4yuad6cg41a6sdg45as6hg4y6sdh4adg4ae4u65adf4hua.html"
 *    }, ...
 *  ],
 *  "total": {
 *    "count": "160162"
 *  },
 *  "page": {
 *    "current": 1,
 *    "size": 25,
 *    "range": 7,
 *    "route": "/phish"
 *  }
 * }
 */
router.get('/',
  /**
   * Get Phishes.
   * @param  {Express.Request} req Express Request
   * @param  {Express.Response} res Express Response
   * @param  {Function} next Express Next function
   * @return {Object} Formatted response
   * @function getPhish
   */
  function getPhish(req, res, next) {
    let page = req.query.page || 1;
    let limit = config.page.size;

    Promise.props({
      title: 'Phish List',
      phishes: Phish.getMany(limit, (page - 1) * limit),
      total: Phish.getCount(),
      page: {
        current: parseInt(page),
        size: limit,
        range: config.page.paginationRange,
        route: '/phish'
      }
    }).then(function(phishesObj) {
      return res.format({
        text: function() {
          return res.send(JSON.stringify(phishesObj));
        },

        html: function() {
          return res.render('pages/phishes', phishesObj);
        },

        json: function() {
          return res.json(phishesObj);
        }
      });
    }).catch(function(err) {
      if (typeof err !== Error) {
        err = new Error(err);
      }

      return next(err);
    });
  });

/**
 * @api {get} /phish/specific/:phishId Get Specific Phish
 * @apiName getSpecificPhish
 * @apiGroup Phish
 *
 * @apiParam {number} phishId id of the phish to fetch
 *
 * @apiDescription
 * Get a specific phish by id.
 *
 * @apiSuccess {object} Response object
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "phish": {
 *    "phishId": 3363,
 *    "importId": 3,
 *    "date": "2015-07-13T05:00:00.000Z",
 *    "baseUrl": "saipowers.com",
 *    "fullUrl": "http://saipowers.com/mom.html"
 *  },
 *  "parts": [
 *    {
 *      "phishId": 3363,
 *      "pathPart": "/mom.html"
 *    }
 *  ],
 *  "exploits": []
 * }
 */
router.get('/specific/:phishId',
  /**
   * Get specific Phish.
   * @param  {Express.Request} req Express Request
   * @param  {Express.Response} res Express Response
   * @param  {Function} next Express Next function
   * @return {Object} Formatted response
   * @function getSpecificPhish
   */
  function getSpecificPhish(req, res, next) {
    Promise.props({
      phish: Phish.getOne(req.params.phishId),
      parts: Phish.getPathParts(req.params.phishId),
      exploits: Phish.getExploits(req.params.phishId)
    }).then(function(phishObj) {
      return res.format({
        text: function() {
          return res.send(JSON.stringify(phishObj));
        },

        html: function() {
          return res.render('pages/phish', phishObj);
        },

        json: function() {
          return res.json(phishObj);
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
