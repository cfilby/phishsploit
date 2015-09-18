'use strict';

/**
 * Module responsible for fetching and rendering about page information.
 * @module phishsploit/controllers/about
 */

import crypto from 'crypto';

import Promise from 'bluebird';
import express from 'express';

let router = express.Router();

let userObj = {
  users: [{
    name: 'Akpoebi Agberebi',
    email: 'jagbereb@uab.edu',
    description: 'CIS Undergrad, Software Programmer at MITS SOHP',
    image: 'https://scontent.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/p720x720/10509581_704723029563710_4529971676091719679_n.jpg?oh=dd397bed5e6b3426bc671659626c9c13&oe=56407D2C'
  }, {
    name: 'Arsh Arora',
    email: 'ararora@uab.edu',
    description: 'Malware Analyst, TA - Accounting and CFSM Graduate Student.',
    image: 'https://scontent.xx.fbcdn.net/hphotos-xat1/v/t1.0-9/1010396_10152127264547450_2051591970_n.jpg?oh=202001f24ea31db4f64b9b596fb83179&oe=56491600'
  }, {
    name: 'Cooper Filby',
    email: 'cfilby@cis.uab.edu',
    description: 'Software Developer and CIS Graduate Student.',
    image: 'http://gravatar.com/avatar/4da218e52d7f4fc113125c6e98056e97?d=mm'
  }, {
    name: 'Sharanya Patlolla',
    email: 'sharanya@uab.edu',
    description: 'CIS Graduate Student and Software Programmer at MITS SOPH ',
    image: '/images/sharanya.jpg'
  }]
};

/**
 * @api {get} /about Get about
 * @apiName getAbout
 * @apiGroup about
 *
 * @apiDescription
 * Get information about our team.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "users": [
 *    {
 *    	"name": "Akpoebi Agberebi",
 *    	"email": "jagbereb@uab.edu",
 *    	"description": "",
 *    	"image": "http://gravatar.com/avatar/cee66e5969aada1a92532c798a99bb26?d=mm"
 *    },
 *    {
 *    	"name": "Arsh Arora",
 *     	"email": "ararora@uab.edu",
 *      "description": "",
 *      "image": "http://gravatar.com/avatar/f9d2438930e2fa56580a07e5d8f8ebe6?d=mm"
 *    },
 *    {
 *    	"name": "Cooper Filby",
 *      "email": "cfilby@cis.uab.edu",
 *      "description": "Software Developer and CIS Graduate Student.",
 *      "image": "http://gravatar.com/avatar/4da218e52d7f4fc113125c6e98056e97?d=mm"
 *    },
 *    {
 *    	"name": "Sharanya Patlolla",
 *    	"email": "sharanya@uab.edu",
 *    	"description": "",
 *    	"image": "http://gravatar.com/avatar/7088259a978506e5d139a153e9fe7f68?d=mm"
 *    }
 *  ]
 * }
 */
router.get('/',
  /**
   * Get the about us page.
   * @param  {Express.Request} req Express Request
   * @param  {Express.Response} res Express Response
   * @param  {Function} next Express Next function
   * @return {Object} Formatted response
   * @function getAbout
   */
  function getAbout(req, res, next) {
    return res.format({
      text: function() {
        return res.send(JSON.stringify(userObj));
      },

      html: function() {
        return res.render('pages/about', userObj);
      },

      json: function() {
        return res.json(userObj);
      }
    });
  });

export default router;
