# Cluster Mode vs Fork Mode Guide for Softeefi Backend

## Current Configuration: FORK MODE ✅
**Date:** August 23, 2025  
**Decision:** Use FORK mode for now

## Current Performance Stats
- Memory Usage: ~84MB
- CPU Usage: 0-5%
- Concurrent Users: < 50
- Response Time: < 200ms
- **Status:** Fork mode is perfectly adequate

## When to Switch to Cluster Mode

### Traffic Thresholds
| Concurrent Users | Mode | Instances | Action |
|-----------------|------|-----------|---------|
| 0-100 | Fork | 1 | **Current Setup** ✅ |
| 100-500 | Cluster | 2 | `pm2 scale softeefi-backend 2` |
| 500-1000 | Cluster | 3-4 | `pm2 scale softeefi-backend 4` |
| 1000+ | Cluster | CPU cores -1 | Max scaling |

### Performance Indicators - Switch When You See:
- **CPU Usage:** Consistently > 60%
- **Memory Usage:** > 400MB
- **Response Time:** API calls > 300ms
- **PM2 Restarts:** Increasing restart count
- **Google Analytics:** 50+ real-time users

## How to Check Current Performance

```bash
# 1. Check PM2 status
pm2 status
pm2 monit

# 2. Check specific metrics
pm2 show softeefi-backend | grep -E "restarts|memory|cpu"

# 3. Test API response time
time curl http://localhost:4000/api/health

# 4. Check Google Analytics real-time
# Visit: https://analytics.google.com → Real-time
```

## How to Switch to Cluster Mode (When Ready)

### Option 1: Quick Switch
```bash
pm2 stop softeefi-backend
pm2 delete softeefi-backend
pm2 start /var/www/softeefi-backend/server.js --name softeefi-backend -i 2 --exec-mode cluster
pm2 save
```

### Option 2: Using Ecosystem File
```bash
# Create ecosystem file
nano /var/www/softeefi-backend/ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'softeefi-backend',
    script: './server.js',
    instances: 2,  // Start with 2
    exec_mode: 'cluster',
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 4000
    }
  }]
};
```

```bash
# Start with ecosystem
pm2 start ecosystem.config.js
pm2 save
```

## Current Optimizations (More Important Than Cluster)
✅ **Compression** - Reduces response size by 70%  
✅ **Rate Limiting** - Prevents abuse  
✅ **Helmet Security** - Security headers  
✅ **MongoDB Indexes** - Fast queries  
✅ **Nginx Caching** - Static file caching  
✅ **CDN Ready** - Can add Cloudflare later  

## Monitoring Tools

### Free Options:
1. **PM2 Monitoring:**
   ```bash
   pm2 monit
   pm2 web  # Web dashboard on port 9615
   ```

2. **Google Analytics:**
   - Real-time users
   - Page load times
   - User behavior

3. **UptimeRobot:**
   - Free uptime monitoring
   - https://uptimerobot.com

## Decision Tree

```
Current Users < 100?
  ├─ YES → Stay with FORK mode ✅
  └─ NO → Check CPU
           ├─ CPU < 60% → Stay with FORK
           └─ CPU > 60% → Switch to CLUSTER

Response Time > 300ms?
  ├─ YES → Check what's slow
  │         ├─ Database → Add indexes
  │         ├─ API calls → Add caching
  │         └─ Server → Switch to CLUSTER
  └─ NO → Stay with FORK ✅
```

## Notes
- **Current Status:** Fork mode is perfect for current traffic
- **Next Review:** When Google Analytics shows 50+ concurrent users
- **Priority:** Focus on content, SEO, and user acquisition
- **Scaling:** Can handle 10x current traffic without changes

## Quick Reference Commands

```bash
# Current setup (FORK MODE)
pm2 start server.js --name softeefi-backend --exec-mode fork

# Future cluster mode (when needed)
pm2 start server.js --name softeefi-backend -i 2 --exec-mode cluster

# Check performance
pm2 monit
pm2 status
pm2 logs softeefi-backend --lines 50
```

---
**Remember:** Premature optimization is the root of all evil. Your current setup can handle significant growth. Focus on getting users first! 🚀