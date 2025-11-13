const redis = require('redis');

// Check if Redis should be disabled (for development without Redis)
const REDIS_ENABLED = process.env.REDIS_ENABLED !== 'false' && process.env.NODE_ENV !== 'test';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

// Track if we've already logged the Redis status
let redisStatusLogged = false;

// Create Redis client
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    reconnectStrategy: (retries) => {
      // In development, try only once then give up
      if (IS_DEVELOPMENT && retries > 0) {
        return false; // Stop retrying
      }
      // In production, keep trying with exponential backoff
      return Math.min(retries * 100, 3000);
    }
  },
  password: process.env.REDIS_PASSWORD || undefined,
  database: process.env.REDIS_DB || 0,
});

// Connect to Redis
if (REDIS_ENABLED) {
  (async () => {
    try {
      await redisClient.connect();
      if (!redisStatusLogged) {
        console.log('✅ Redis connected successfully');
        redisStatusLogged = true;
      }
    } catch (error) {
      if (!redisStatusLogged) {
        if (IS_DEVELOPMENT) {
          console.log('ℹ️ Redis not available in development - running without caching');
        } else {
          console.error('⚠️ Redis connection failed - running without caching:', error.message);
        }
        redisStatusLogged = true;
      }
      // Continue without Redis - graceful degradation
    }
  })();
} else {
  console.log('ℹ️ Redis disabled - running without caching');
}

// Error handling - only log once
redisClient.on('error', (err) => {
  if (!redisStatusLogged || !IS_DEVELOPMENT) {
    // In development, only log once. In production, keep logging
    if (!redisStatusLogged) {
      console.log('ℹ️ Redis not available - caching disabled');
      redisStatusLogged = true;
    }
  }
});

redisClient.on('ready', () => {
  if (!redisStatusLogged) {
    console.log('✅ Redis client ready');
    redisStatusLogged = true;
  }
});

// Cache middleware
const cacheMiddleware = (cacheName, ttl = 3600) => {
  return async (req, res, next) => {
    if (!redisClient.isReady) {
      return next(); // Skip cache if Redis is not available
    }

    const key = `${cacheName}:${req.originalUrl || req.url}`;
    
    try {
      const cachedData = await redisClient.get(key);
      
      if (cachedData) {
        console.log(`Cache hit for ${key}`);
        return res.json(JSON.parse(cachedData));
      }
      
      // Store the original res.json function
      const originalJson = res.json.bind(res);
      
      // Override res.json to cache the response
      res.json = (data) => {
        // Cache the response silently
        redisClient.setEx(key, ttl, JSON.stringify(data))
          .catch(() => {}); // Silently ignore cache set errors
        
        // Send the response
        return originalJson(data);
      };
      
      next();
    } catch (error) {
      // Silently continue without cache on error
      next();
    }
  };
};

// Cache invalidation helper
const invalidateCache = async (pattern) => {
  if (!redisClient.isReady) return;
  
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`Invalidated ${keys.length} cache entries`);
    }
  } catch (error) {
    // Silently ignore cache invalidation errors
  }
};

// Common cache operations
const cacheOperations = {
  // Get cached data
  get: async (key) => {
    if (!redisClient.isReady) return null;
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      return null; // Silently return null on error
    }
  },

  // Set cache with TTL
  set: async (key, data, ttl = 3600) => {
    if (!redisClient.isReady) return false;
    try {
      await redisClient.setEx(key, ttl, JSON.stringify(data));
      return true;
    } catch (error) {
      return false; // Silently return false on error
    }
  },

  // Delete cache
  del: async (key) => {
    if (!redisClient.isReady) return false;
    try {
      await redisClient.del(key);
      return true;
    } catch (error) {
      return false; // Silently return false on error
    }
  },

  // Check if key exists
  exists: async (key) => {
    if (!redisClient.isReady) return false;
    try {
      return await redisClient.exists(key) === 1;
    } catch (error) {
      return false; // Silently return false on error
    }
  }
};

module.exports = {
  redisClient,
  cacheMiddleware,
  invalidateCache,
  cache: cacheOperations
};