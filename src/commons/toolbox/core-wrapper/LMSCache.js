const redis = require('redis');
const config = require('../../config');

const redisClient = redis.createClient({
  socket: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT
  }
});

redisClient.connect();

const LMSCache = {
  getCacheByKey: async (key) => {
    try {
      const redis_data = await redisClient.get(key);
      return redis_data;
    }
    catch (err) {
      console.error(err.message);
    }
  },
  setCacheByKey: async (key, value) => {
    try {
      await redisClient.set(key, JSON.stringify(value));
    }
    catch (err) {
      console.error(err.message);
    }
  },
  deleteCacheByKey: async (key) => {
    try {
      const keys = await redisClient.keys(`${key}*`);
      if (keys.length > 0) await redisClient.del(keys);
    }
    catch (err) {
      console.error(err.message);
    }
  }
};

module.exports = { LMSCache };
