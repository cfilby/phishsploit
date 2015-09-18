'use strict';

/**
 * Module containing functions responsible for querying the database for
 * Phish related data.
 * @module phishsploit/models/phish
 */

import * as db from './db/util';
import * as schema from './db/schema';

let exploit = schema.exploit;
let phish = schema.phish;
let phishPathPart = schema.phishPathPart;
let phishPartFrequency = schema.phishPartFrequency;
let exploitPhish = schema.exploitPhish;

/**
 * Get a specified Phish from the database.
 * @param  {number} phishId id of the phish to fetch
 * @param  {Function} [callback] optional err/result callback
 * @return {Promise} Promise with corresponding Phish
 */
export function getOne(phishId, callback) {
  let getPhishQuery = phish.select()
    .where(phish.phishId.equals(phishId))
    .toQuery();

  return db.queryOne(getPhishQuery.text, getPhishQuery.values)
    .nodeify(callback);
}

/**
 * Get a number of Phish from the database.
 * Get the Phishes, Hobbiteses!!!
 * @param  {number} limit=50 maximum number of Phish to fetch
 * @param  {number} offset=0 offset for Phish to fetch
 * @param  {Function} [callback] optional err/result callback
 * @return {Promise} Promise with corresponding Phish
 */
export function getMany(limit = 50, offset = 0, callback) {
  let getPhishesQuery = phish.select()
    .order(phish.phishId)
    .limit(limit)
    .offset(offset)
    .toQuery();

  return db.queryMany(getPhishesQuery.text, [])
    .nodeify(callback);
}

/**
 * Get the total number of phish from the database.
 * @param  {Function} [callback] optional err/result callback
 * @return {Promise} Promise with corresponding Phish
 */
export function getCount(callback) {
  let getPhishesQuery = phish.select(phish.phishId.count().as('count'))
    .toQuery();

  return db.queryOne(getPhishesQuery.text, [])
    .nodeify(callback);
}

/**
 * Fetch the path parts associated with a given Phish.
 * @param  {number} phishId id of the phish to fetch pathParts for
 * @param  {Function} [callback] optional err/result callback
 * @return {Promise} Promise with corresponding phishPathParts
 */
export function getPathParts(phishId, callback) {
  let getPathPartsQuery = phishPathPart.select()
    .where(phishPathPart.phishId.equals(phishId))
    .toQuery();

  return db.query(getPathPartsQuery.text, getPathPartsQuery.values)
    .nodeify(callback);
}

/**
 * Fetch phishPartFrequencies in descending order.
 * @param  {number} limit=50 maximum number of phishPartFrequencies to fetch
 * @param  {number} offset=0 offset for phishPartFrequencies to fetch
 * @param  {Function} [callback] optional err/result callback
 * @return {Promise} Promise with corresponding phishPartFrequencies
 */
export function getPartFrequencies(limit = 50, offset = 0, callback) {
  let getPathFrequenciesQuery = phishPartFrequency.select()
    .order(phishPartFrequency.pathCount.descending)
    .limit(limit)
    .offset(offset)
    .toQuery();

  return db.queryMany(getPathFrequenciesQuery.text, [])
    .nodeify(callback);
}

/**
 * Find all phish that contain a specified path in it's url.
 * @param  {string} pathPart pathPart to find related phish for.
 * @param  {number} limit=50 maximum number of phishPartFrequencies to fetch
 * @param  {number} offset=0 offset for phishPartFrequencies to fetch
 * @param  {Function} [callback] optional err/result callback
 * @return {Promise} Promise with corresponding phishPartFrequencies
 */
export function getRelated(pathPart, limit = 50, offset = 0, callback) {
  let getRelatedPhishQuery = phish.select()
    .where(phish.fullUrl.like('%' + pathPart + '%'))
    .limit(limit)
    .offset(offset)
    .toQuery();

    return db.query(getRelatedPhishQuery.text, getRelatedPhishQuery.values)
      .nodeify(callback);
};

/**
 * Get the number of phish containing the specified substring.
 * @param  {string} pathPart pathPart to find related phish for.
 * @param  {Function} [callback] optional err/result callback
 * @return {Promise} Promise with corresponding phishPartFrequencies
 */
export function getRelatedCount(pathPart, callback) {
  let getRelatedPhishQuery = phish.select(phish.phishId.count().as('count'))
    .where(phish.fullUrl.like('%' + pathPart + '%'))
    .toQuery();

    return db.queryOne(getRelatedPhishQuery.text, getRelatedPhishQuery.values)
      .nodeify(callback);
};

/**
 * Get Exploits associated with a given Phish.
 * @param  {number} phishId id of the phish to fetch corresponding Exploits for
 * @param  {Function} [callback] optional err/result callback
 * @return {Promise} Promise with corresponding Exploits
 */
export function getExploits(phishId, callback) {
  let getPhishExploitQuery = exploit.select()
    .where(exploit.exploitId.in(
      exploitPhish.subQuery().select(exploitPhish.exploitId)
      .where(exploitPhish.phishId.equals(phishId))
    )).toQuery();

  return db.query(getPhishExploitQuery.text, getPhishExploitQuery.values)
    .nodeify(callback);
}
