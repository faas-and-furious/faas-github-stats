const fs = require('fs');
const { log } = require('./logger');

class CacheService {
  constructor(opts) {
    const { invalidationSeconds, cacheFilePath } = opts;
    this.invalidationSeconds = invalidationSeconds;
    this.cacheFilePath = cacheFilePath;
    this.statsResultFilePath = '/tmp/stats_result.json';
  }

  async readFromCache() {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(this.cacheFilePath)) {
        reject(new Error('Cache does not exist'));
        return;
      }
      const cacheMeta = JSON.parse(
        fs.readFileSync(this.cacheFilePath).toString()
      );
      log('found cache meta:', cacheMeta);

      const now = new Date();
      if (cacheMeta.expires_in < now.getTime()) {
        reject(new Error('Cache has expired'));
        return;
      }

      const result = JSON.parse(
        fs.readFileSync(cacheMeta.result_file_path).toString()
      );
      resolve(result);
    });
  }

  async saveToCache(result) {
    return new Promise(resolve => {
      const expiresIn = new Date().getTime() + this.invalidationSeconds * 1000;
      const cacheMeta = {
        expires_in: expiresIn,
        result_file_path: this.statsResultFilePath
      };
      fs.writeFileSync(this.cacheFilePath, JSON.stringify(cacheMeta));
      fs.writeFileSync(this.statsResultFilePath, JSON.stringify(result));

      log('cache will be valid until:', expiresIn);
      resolve();
    });
  }
}

module.exports = CacheService;
