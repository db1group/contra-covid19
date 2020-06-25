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
const redisClient = (app) => {
  if (redis) return redis;

  console.info('Connecting Redis Server...');
  redis = new Redis(process.env.REDIS_URL);

  redis.on('error', (error) => {
    if (error.code === 'ECONNREFUSED') {
      redis.disconnect();
    }
    console.error(`Redis Error: ${error.message}`);
  });

  redis.on('connect', () => { connected = true; });
  redis.on('close', () => { connected = false; });

  if (app) {
    app.use(middlewareRedis);
  }
  return redis;
};

module.exports = redisClient;
