// autogenerated by sql-generate v1.0.0 on Thu Jul 23 2015 23:01:28 GMT-0500 (CDT)

var sql = require('sql');


/**
 * SQL definition for public.exploit
 */
exports.exploit = sql.define({
  name: 'exploit',
  columns: [{
    name: 'exploit_id',
    property: 'exploitId'
  }, {
    name: 'description',
    property: 'description'
  }, {
    name: 'date',
    property: 'date'
  }, {
    name: 'author',
    property: 'author'
  }, {
    name: 'platform',
    property: 'platform'
  }, {
    name: 'type',
    property: 'type'
  }, {
    name: 'port',
    property: 'port'
  }]
});


/**
 * SQL definition for public.exploit_file
 */
exports.exploitFile = sql.define({
  name: 'exploit_file',
  columns: [{
    name: 'exploit_id',
    property: 'exploitId'
  }, {
    name: 'file_name',
    property: 'fileName'
  }, {
    name: 'content',
    property: 'content'
  }]
});


/**
 * SQL definition for public.exploit_key_path
 */
exports.exploitKeyPath = sql.define({
  name: 'exploit_key_path',
  columns: [{
    name: 'exploit_id',
    property: 'exploitId'
  }, {
    name: 'path_part',
    property: 'pathPart'
  }, {
    name: 'description',
    property: 'description'
  }]
});


/**
 * SQL definition for public.exploit_phish
 */
exports.exploitPhish = sql.define({
  name: 'exploit_phish',
  columns: [{
    name: 'exploit_id',
    property: 'exploitId'
  }, {
    name: 'phish_id',
    property: 'phishId'
  }]
});


/**
 * SQL definition for public.exploit_phish_frequency
 */
exports.exploitPhishFrequency = sql.define({
  name: 'exploit_phish_frequency',
  columns: [{
    name: 'exploit_id',
    property: 'exploitId'
  }, {
    name: 'frequency',
    property: 'frequency'
  }]
});


/**
 * SQL definition for public.import
 */
exports.import = sql.define({
  name: 'import',
  columns: [{
    name: 'import_id',
    property: 'importId'
  }, {
    name: 'import_date',
    property: 'importDate'
  }, {
    name: 'file_name',
    property: 'fileName'
  }, {
    name: 'name',
    property: 'name'
  }, {
    name: 'description',
    property: 'description'
  }]
});


/**
 * SQL definition for public.phish
 */
exports.phish = sql.define({
  name: 'phish',
  columns: [{
    name: 'phish_id',
    property: 'phishId'
  }, {
    name: 'import_id',
    property: 'importId'
  }, {
    name: 'date',
    property: 'date'
  }, {
    name: 'base_url',
    property: 'baseUrl'
  }, {
    name: 'full_url',
    property: 'fullUrl'
  }]
});


/**
 * SQL definition for public.phish_part_frequency
 */
exports.phishPartFrequency = sql.define({
  name: 'phish_part_frequency',
  columns: [{
    name: 'path_part',
    property: 'pathPart'
  }, {
    name: 'path_count',
    property: 'pathCount'
  }]
});


/**
 * SQL definition for public.phish_path_part
 */
exports.phishPathPart = sql.define({
  name: 'phish_path_part',
  columns: [{
    name: 'phish_id',
    property: 'phishId'
  }, {
    name: 'path_part',
    property: 'pathPart'
  }]
});
