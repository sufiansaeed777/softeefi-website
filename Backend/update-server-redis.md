# Add Redis Caching to Your Server

## 1. Update your Backend/server.js

Add this near the top (after other requires):
```javascript
// Add Redis caching
const { cacheMiddleware } = require('./Utils/redisClient');
```

## 2. Wrap your routes with caching

Find these lines in your server.js and update them:

### BEFORE:
```javascript
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);
```

### AFTER:
```javascript
// Cache analytics for 1 hour (3600 seconds)
app.use('/api/analytics', cacheMiddleware('analytics', 3600), analyticsRoutes);

// Cache AI responses for 30 minutes (1800 seconds)  
app.use('/api/ai', cacheMiddleware('ai', 1800), aiRoutes);

// DON'T cache contact/user data
app.use('/api/contact', contactRoutes); // No change
app.use('/api/free-reports', freeReportsRoutes); // No change
```

## 3. Test if Redis caching is working

After deploying, run these on your server:

```bash
# Check Redis is getting data
redis-cli KEYS "*"

# Monitor Redis in real-time
redis-cli MONITOR

# Check memory usage
redis-cli INFO memory | grep used_memory_human

# Clear cache if needed
redis-cli FLUSHALL
```

## 4. Expected Results

First API call (not cached):
- /api/analytics → 200ms → Data from MongoDB
- Redis stores the result

Second API call (cached):
- /api/analytics → 2ms → Data from Redis (100x faster!)

## Full example for server.js:

```javascript
// At the top
const { cacheMiddleware } = require('./Utils/redisClient');

// In your routes section
// Cache GET routes only, with different TTLs
app.use('/api/analytics', cacheMiddleware('analytics', 3600), analyticsRoutes);
app.use('/api/ai', cacheMiddleware('ai', 1800), aiRoutes);

// These don't need caching (POST requests)
app.use('/api/contact', contactRoutes);
app.use('/api/ask', askRoutes);
app.use('/api/free-reports', freeReportsRoutes);
```

## Cache Times (TTL) Recommendations:
- Analytics: 3600 (1 hour) - doesn't change often
- AI responses: 1800 (30 min) - semi-static
- Services list: 7200 (2 hours) - rarely changes
- User data: 0 (don't cache) - always fresh