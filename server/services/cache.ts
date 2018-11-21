const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

import { keys } from '../config/index';
import { CacheKeys } from '../constants';

const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

export async function applyCaching(req, res, next) {

  mongoose.Query.prototype.cache = function (key: CacheKeys, cacheForUser?: boolean) {
    this.useCache = true;
    this.hashKey = cacheForUser ? JSON.stringify(req.user.id) : null;
    this.key = key;

    return this;
  };

  mongoose.Query.prototype.exec = async function () {

    // if caching not required, just execute query as normal
    if (!this.useCache) {
      return exec.apply(this, arguments);
    }

    // check if data is cached
    const cacheValue = this.hashKey
      ? await client.hget(this.hashKey, this.key)
      : await client.get(this.key);


    // if so, get the document and return it
    if (cacheValue) {
      console.log('from cache')
      const doc = JSON.parse(cacheValue);

      return Array.isArray(doc)
        ? doc.map(d => new this.model(d))
        : new this.model(doc);
    }

    // otherwise issue the query and store the result in redis
    const result = await exec.apply(this, arguments);

    if (this.hashKey) {
      client.hset(this.hashKey, this.key, JSON.stringify(result)/*, 'EX', 10*/);
    } else {
      client.set(this.key, JSON.stringify(result)/*, 'EX', 10*/);
    }

    return result;
  };

  next();
}

export async function clearHash(key: CacheKeys, userId: string) {

  // if id provided, clear cached data for a given user only, otherwise clear for all
  return userId ? await client.del(userId, key) : await client.del(key);
}

