'use strict';

import Promise from 'bluebird';
import express from 'express';

import config from '../config/config';
import {
  Exploit, Phish
}
from '../models/index';

let router = express.Router();

/**
 * @api {get} /search Search the database
 * @apiName search
 * @apiGroup Search
 *
 * @apiParam {number} [page] number of the page to Request
 * @apiParam {string} query_type Must be 'phish_url' or 'exploit_content'
 * @apiParam {string} term Term to search for
 *
 * @apiDescription
 * Get a list of Phish or Exploit content that match the provided term.
 *
 * @apiSuccess {object} Response object
 * @apiSuccessExample {json} Phish-Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "type": "exploit",
 *  "results": [
 *    {
 *      "exploitId": 6,
 *      "description": "WordPress <= 2.0.2 - (cache) Remote Shell Injection Exploit",
 *      "date": "2006-05-25T05:00:00.000Z",
 *      "author": "rgod",
 *      "platform": "php",
 *      "type": "webapps",
 *      "port": 0
 *    }, ...
 *  ],
 *  "total": {
 *    "count": "455"
 *  },
 *  "query": {
 *    "term": "wp-content",
 *    "type": "exploit_content"
 *  },
 *  "page": {
 *    "current": 1,
 *    "size": 25,
 *    "range": 7,
 *    "route": "/search"
 *  }
 * }
 *
 * @apiSuccessExample {json} Exploit-Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "type": "phish",
 *  "results": [
 *    {
 *      "phishId": 3369,
 *      "importId": 3,
 *      "date": "2015-07-13T05:00:00.000Z",
 *      "baseUrl": "www.upstartist.tv",
 *      "fullUrl": "http://www.upstartist.tv/wp-content/uploads/2013/08/pulign/50e6f13969dcc7166c043256f428ff70/en_US/i/scr/pulign/c7b9ea7772c673ae276c290a89bb7cb1/Confirm.php"
 *    }, ...
 *  ],
 *  "total": {
 *    "count": "10638"
 *  },
 *  "query": {
 *    "term": "wp-content",
 *    "type": "phish_url"
 *  },
 *  "page": {
 *    "current": 1,
 *    "size": 25,
 *    "range": 7,
 *    "route": "/search"
 *  }
 * }
 */
router.get('/',
  /**
   * [function description]
   * @param  {Express.Request} req Express Request
   * @param  {Express.Response} res Express Response
   * @param  {Function} next Express Next function
   * @return {Object} Formatted response
   * @function search
   */
  function search(req, res, next) {
    let page = req.query.page || 1;
    let limit = config.page.size;

    let contentPromise = undefined;
    let countPromise = undefined;
    let type = undefined;

    switch(req.query.query_type) {
      case 'phish_url':
        type = 'phish';
        contentPromise = Phish.getRelated(req.query.term, limit, (page - 1) * limit);
        countPromise = Phish.getRelatedCount(req.query.term);
        break;
      case 'exploit_content':
        type = 'exploit';
        contentPromise = Exploit.getByContent(req.query.term, limit, (page - 1) * limit);
        countPromise = Exploit.getByContentCount(req.query.term);
        break;
      default:
        contentPromise = Promise.resolve(null);
        countPromise = Promise.resolve(null);
    }

    Promise.props({
      type: type,
      results: contentPromise,
      total: countPromise,
      query: {
        term: req.query.term,
        type: req.query.query_type
      },
      page: {
        current: parseInt(page),
        size: limit,
        range: config.page.paginationRange,
        route: '/search'
      }
    }).then(function(searchObj) {
      console.log(searchObj);
      return res.format({
        text: function() {
          return res.send(JSON.stringify(searchObj));
        },

        html: function() {
          return res.render('pages/search', searchObj);
        },

        json: function() {
          return res.json(searchObj);
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
