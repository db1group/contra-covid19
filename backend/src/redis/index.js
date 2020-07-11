const Redis = require('ioredis');

let redis;
let connected = false;

const methodsHTTPDestructive = ['POST', 'PUT', 'DELETE'];
const methodGET = 'GET';

const isMethodGet = (method) => method === methodGET;

const getRouteURL = ({ baseUrl, url }) => {
  if (baseUrl.match(/^\/public/)) return url.match(/^\/public/) ? url : `/public${url}`;
  return url.match(/^\/api/) ? url : `/api${url}`;
};

const removeCache = (req) => {
  if (!methodsHTTPDestructive.includes(req.method)) return;
  if (connected) redis.del(getRouteURL(req));
};

const removeCacheByKey = (key) => {
  if (connected) redis.del(key);
};

const getCacheByKey = async (key) => {
  if (connected) return redis.get(key);
  return null;
};

const setCacheByKey = (key, content, expire) => {
  if (!connected) return;
  const body = content instanceof Buffer ? content.toString() : content;
  redis.set(key, body, 'EX', expire || process.env.REDIS_EXPIRE);
};

const setCacheQuery = (req, content, expire) => {
  if (!connected) return;
  const body = content instanceof Buffer ? content.toString() : content;
  redis.set(getRouteURL(req), body, 'EX', expire || process.env.REDIS_EXPIRE);
};


const getByCache = async (req, res, next) => {
  if (!isMethodGet(req.method)) {
    next();
    return;
  }
  try {
    if (!connected) {
      next();
      return;
    }
    const response = await redis.get(req.url);
    if (!response) {
      next();
      return;
    }
    res.json(JSON.parse(response));
  } catch (err) {
    console.error(`Redis Error: ${err.message}`);
    next();
  }
};

const middlewareRedis = (req, res, next) => {
  try {
    req.setCache = setCacheQuery;
    req.setCacheByKey = setCacheByKey;
    req.removeCacheByKey = removeCacheByKey;
    req.getCacheByKey = getCacheByKey;
    req.redisConnected = connected;
    req.redis = {};
    if (!connected) {
      next();
      return;
    }
    req.redis = redis;
    removeCache(req);
    getByCache(req, res, next);
  } catch (err) {
    next();
  }
};

const reconnect = () => {
  if (connected) return redis;
  if (redis) {
    redis.disconnect();
    redis = null;
  }

  let timeReconnect;
  console.info('Connecting Redis Server...');
  redis = new Redis(process.env.REDIS_URL);

  redis.on('error', (error) => {
    if (error.code === 'ECONNREFUSED') {
      redis.disconnect();
      timeReconnect = setTimeout(() => reconnect(), process.env.REDIS_RECONNECT || 10000);
    }
    console.error(`Redis Error: ${error.message}`);
  });

  redis.on('connect', () => {
    clearTimeout(timeReconnect);
    connected = true;
    console.info('Connected Redis Server...');
  });
  redis.on('close', () => { connected = false; });

  return redis;
};

const redisClient = (app) => {
  reconnect();
  if (app) {
    app.use(middlewareRedis);
  }
  return redis;
};

module.exports = redisClient;
