'use strict';

/**
 * Module responsible for encapsulating the database driver.
 * @module phishsploit/models/db/util
 */

import Promise from 'bluebird';
import pgPromise from 'pg-promise';

import config from '../../config/config';

let db = (pgPromise())(config.db);

/**
 * Execute a query on the database to retrieve data.
 * @param  {string} query Postgresql Query
 * @param  {Array} [values] values to associate with the query
 * @return {Promise} Promise for the SQL Operation
 */
 export function query(query, values=[]) {
   return db.query(query, values);
 }

/**
* Execute a query on the database to retrieve exactly one result. The promise
* will be rejected if no results are found or multiple results are found.
* @param  {string} query Postgresql Query
* @param  {Array} [values] values to associate with the query
* @return {Promise} Promise for the SQL Operation
*/
export function queryOne(query, values=[]) {
  return db.one(query, values);
}

/**
* Execute a query on the database to retrieve multiple results. The promise
* will be rejected if many results aren't found.
* @param  {string} query Postgresql Query
* @param  {Array} [values] values to associate with the query
* @return {Promise} Promise for the SQL Operation
*/
export function queryMany(query, values=[]) {
  return db.many(query, values);
}
