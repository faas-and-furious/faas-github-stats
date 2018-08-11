'use strict';

const GithubHelper = require('./lib/github-helper');
const CacheService = require('./lib/cache-service');
const fs = require('fs');
const { log } = require('./lib/logger');

const {
  API_KEY_NAME,
  CACHE_INVALIDATE_SECONDS,
  CACHE_FILE_PATH,
  GITHUB_API_KEY
} = process.env;

let token = '';
if (GITHUB_API_KEY) {
  log('reading from env var');
  token = GITHUB_API_KEY;
} else {
  log('reading from secrets');
  token = fs.readFileSync(`/var/openfaas/secrets/${API_KEY_NAME}`).toString();
}

module.exports = (context, callback) => {
  const org = JSON.parse(context).org;
  const helper = new GithubHelper(org, token);
  const cacheService = new CacheService({
    invalidationSeconds: CACHE_INVALIDATE_SECONDS,
    cacheFilePath: CACHE_FILE_PATH
  });

  cacheService
    .readFromCache()
    .then(result => {
      log('returning cache');
      callback(undefined, result);
    })
    .catch(err => {
      log(err);
      helper
        .createReport()
        .then(r => {
          return cacheService.saveToCache(r).then(() => callback(undefined, r));
        })
        .catch(err => callback(err, undefined));
    });
};
