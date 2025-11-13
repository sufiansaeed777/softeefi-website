# 🚀 New Project Optimization Checklist

## 📦 Initial Setup Optimizations

### Package.json Configuration
```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "build:prod": "GENERATE_SOURCEMAP=false craco build",
    "analyze": "source-map-explorer 'build/static/js/*.js'",
    "analyze:bundle": "ANALYZE=true craco build"
  }
}
```

### Essential Dependencies
```bash
# Production dependencies
npm install --save react-lazy-load-image-component web-vitals

# Dev dependencies
npm install --save-dev @craco/craco compression-webpack-plugin 
npm install --save-dev webpack-bundle-analyzer source-map-explorer
```

## ⚡ Build & Bundle Optimizations

### 1. Create craco.config.js
```javascript
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      if (env === 'production') {
        // Add compression
        webpackConfig.plugins.push(
          new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 8192,
            minRatio: 0.8,
          }),
          new CompressionPlugin({
            filename: '[path][base].br',
            algorithm: 'brotliCompress',
            test: /\.(js|css|html|svg)$/,
            compressionOptions: { level: 11 },
            threshold: 8192,
            minRatio: 0.8,
          })
        );

        // Optimize chunking
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-router)[\\/]/,
              name: 'react-vendor',
              priority: 20,
            },
          },
        };
      }

      if (process.env.ANALYZE === 'true') {
        webpackConfig.plugins.push(new BundleAnalyzerPlugin());
      }

      return webpackConfig;
    },
  },
};
```

## 🖼️ Image Optimization

### 1. Lazy Loading Component
```javascript
// components/OptimizedImage.js
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const OptimizedImage = ({ src, alt, ...props }) => (
  <LazyLoadImage
    src={src}
    alt={alt}
    effect="blur"
    loading="lazy"
    {...props}
  />
);
```

### 2. Image Format Strategy
- Use WebP with fallback to JPEG
- Implement responsive images with srcset
- Compress images before deployment
- Use CDN for image delivery

### 3. Image Optimization Script
```bash
#!/bin/bash
# optimize-images.sh
for img in *.{jpg,png}; do
  # Create WebP version
  cwebp -q 85 "$img" -o "${img%.*}.webp"
  # Optimize original
  convert "$img" -quality 85 -resize 1920x1080\> "$img"
done
```

## ⚙️ Component Optimizations

### 1. Code Splitting
```javascript
// Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Use with Suspense
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### 2. Memoization
```javascript
// Memoize expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive render */}</div>
});

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensive(data);
}, [data]);
```

### 3. Performance Hooks
```javascript
// hooks/useOptimized.js
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
};

export const useThrottle = (callback, limit = 100) => {
  const inThrottle = useRef(false);
  
  return useCallback((...args) => {
    if (!inThrottle.current) {
      callback(...args);
      inThrottle.current = true;
      setTimeout(() => {
        inThrottle.current = false;
      }, limit);
    }
  }, [callback, limit]);
};
```

## 🌐 Service Worker & PWA

### 1. Basic Service Worker
```javascript
// public/service-worker.js
const CACHE_NAME = 'app-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

### 2. Register Service Worker
```javascript
// index.js
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
serviceWorkerRegistration.register();
```

## 🎨 CSS Optimizations

### 1. Critical CSS
- Inline critical CSS in HTML head
- Lazy load non-critical CSS
- Use CSS modules or styled-components for scoping

### 2. CSS Optimization
```css
/* Use CSS custom properties for theming */
:root {
  --primary-color: #007bff;
  --text-color: #333;
}

/* Prefer transform over position changes */
.animate {
  transform: translateX(100px); /* Good */
  /* left: 100px; */ /* Avoid */
}

/* Use will-change sparingly */
.will-animate {
  will-change: transform;
}
```

## 📱 Mobile Optimizations

### 1. Responsive Design
```css
/* Mobile-first approach */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Touch-friendly buttons */
button {
  min-height: 44px;
  min-width: 44px;
}

/* Prevent iOS zoom */
input, textarea {
  font-size: 16px;
}
```

### 2. Mobile Performance
```javascript
// Detect device capabilities
const isMobile = window.innerWidth <= 768;
const isLowEnd = navigator.hardwareConcurrency <= 2;

// Conditionally load features
if (!isMobile || !isLowEnd) {
  loadHeavyFeatures();
}
```

## 🚀 Server & Deployment Optimizations

### 1. Nginx Advanced Configuration
```nginx
# /etc/nginx/nginx.conf - Main configuration
worker_processes auto;
worker_rlimit_nofile 65535;

events {
    worker_connections 4096;
    use epoll;
    multi_accept on;
}

http {
    # Basic Settings
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 20M;
    
    # Buffer Settings
    client_body_buffer_size 128k;
    client_header_buffer_size 1k;
    large_client_header_buffers 4 16k;
    output_buffers 1 32k;
    postpone_output 1460;
    
    # Gzip Settings
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss 
               application/rss+xml application/atom+xml image/svg+xml 
               text/javascript application/vnd.ms-fontobject 
               application/x-font-ttf font/opentype;
    
    # Brotli (if module installed)
    # brotli on;
    # brotli_comp_level 6;
    # brotli_types text/plain text/css text/javascript application/javascript application/json;
    
    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
    
    # Cache Settings
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m 
                     max_size=1g inactive=60m use_temp_path=off;
}

# Site configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com;

    # SSL Optimization
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    
    # Static files with caching
    location ~* \.(jpg|jpeg|png|gif|webp|svg|css|js|woff2|woff|ttf|otf|eot|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary "Accept-Encoding";
        access_log off;
    }
    
    # API with caching and rate limiting
    location /api {
        limit_req zone=api burst=20 nodelay;
        
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Enable caching for GET requests
        proxy_cache api_cache;
        proxy_cache_valid 200 10m;
        proxy_cache_methods GET HEAD;
        proxy_cache_key "$scheme$request_method$host$request_uri";
        add_header X-Cache-Status $upstream_cache_status;
    }
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:;" always;
}
```

### 2. Node.js/Express Backend Optimizations
```javascript
// server.js - Comprehensive optimizations
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');
const mongoose = require('mongoose');

const app = express();

// 1. Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// 2. Compression
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
}));

// 3. Body Parser Limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. Redis Setup for Caching & Sessions
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
});

// 5. Rate Limiting
const limiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rate-limit:',
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
});

app.use('/api/', limiter);
app.use('/api/auth/', authLimiter);

// 6. MongoDB Optimization
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
});

// Add indexes
mongoose.connection.once('open', () => {
  // Example: Create indexes
  User.collection.createIndex({ email: 1 }, { unique: true });
  User.collection.createIndex({ createdAt: -1 });
});

// 7. Response Caching Middleware
const cache = (duration) => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedBody = redisClient.get(key);
    
    if (cachedBody) {
      res.send(JSON.parse(cachedBody));
      return;
    }
    
    res.sendResponse = res.send;
    res.send = (body) => {
      redisClient.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };
    next();
  };
};

// Use cache middleware
app.get('/api/products', cache(300), async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 8. Database Query Optimization
// Use lean() for read-only queries
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
    .lean()
    .select('name email profile')
    .populate('posts', 'title date');
  res.json(user);
});

// Use aggregation for complex queries
app.get('/api/stats', async (req, res) => {
  const stats = await Order.aggregate([
    { $match: { status: 'completed' } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        total: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: -1 } },
    { $limit: 12 }
  ]);
  res.json(stats);
});

// 9. Async Error Handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/api/data', asyncHandler(async (req, res) => {
  const data = await fetchData();
  res.json(data);
}));

// 10. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

// 11. Graceful Shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    mongoose.connection.close(false, () => {
      redisClient.quit(() => {
        process.exit(0);
      });
    });
  });
});
```

### 3. PM2 Advanced Configuration
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'app',
    script: './server.js',
    instances: 'max', // Use all CPU cores
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 4000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    // Auto restart if memory exceeds limit
    max_restarts: 10,
    min_uptime: '10s',
    // Graceful reload
    listen_timeout: 3000,
    kill_timeout: 5000,
  }]
};
```

### 4. Database Optimizations

#### MongoDB
```javascript
// Optimization strategies
// 1. Indexing
db.collection.createIndex({ field: 1 }); // Single field
db.collection.createIndex({ field1: 1, field2: -1 }); // Compound
db.collection.createIndex({ "nested.field": 1 }); // Nested field
db.collection.createIndex({ field: "text" }); // Text search

// 2. Query optimization
// Use projection to limit fields
db.collection.find({}, { name: 1, email: 1, _id: 0 });

// Use pagination
const pageSize = 20;
const page = 1;
db.collection.find()
  .skip((page - 1) * pageSize)
  .limit(pageSize);

// 3. Connection pooling
const options = {
  maxPoolSize: 50,
  minPoolSize: 10,
  maxIdleTimeMS: 10000,
  waitQueueTimeoutMS: 5000,
};
```

#### PostgreSQL
```sql
-- Indexing
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at DESC);

-- Query optimization
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

-- Connection pooling with pg-pool
```

### 5. Redis Caching Strategy
```javascript
// Cache patterns
const redisCache = {
  // Cache aside pattern
  async get(key, fetchFunction, ttl = 3600) {
    let data = await redisClient.get(key);
    
    if (!data) {
      data = await fetchFunction();
      await redisClient.setex(key, ttl, JSON.stringify(data));
    } else {
      data = JSON.parse(data);
    }
    
    return data;
  },
  
  // Invalidate cache
  async invalidate(pattern) {
    const keys = await redisClient.keys(pattern);
    if (keys.length) {
      await redisClient.del(keys);
    }
  },
  
  // Cache warming
  async warm(keys) {
    for (const { key, fetchFunction, ttl } of keys) {
      const data = await fetchFunction();
      await redisClient.setex(key, ttl, JSON.stringify(data));
    }
  }
};

// Usage
app.get('/api/products/:id', async (req, res) => {
  const product = await redisCache.get(
    `product:${req.params.id}`,
    () => Product.findById(req.params.id),
    3600
  );
  res.json(product);
});
```

### 6. CDN & Static Asset Optimization
```javascript
// Serve static files with proper headers
app.use('/static', express.static('public', {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// CDN URLs for production
const getCDNUrl = (path) => {
  if (process.env.NODE_ENV === 'production') {
    return `https://cdn.example.com${path}`;
  }
  return path;
};
```

### 7. Monitoring & Logging
```javascript
// Performance monitoring
const prometheus = require('prom-client');
const register = new prometheus.Registry();

// Metrics
const httpDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

register.registerMetric(httpDuration);

// Middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpDuration.labels(req.method, req.route?.path || req.path, res.statusCode).observe(duration);
  });
  next();
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

## 📊 Performance Monitoring

### 1. Web Vitals
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to analytics
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### 2. Performance Observer
```javascript
// Monitor long tasks
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Long task detected:', entry);
  }
});
observer.observe({ entryTypes: ['longtask'] });
```

## ✅ Pre-Launch Checklist

### Frontend
- [ ] Bundle size < 500KB (initial load)
- [ ] Code splitting implemented
- [ ] Images optimized and lazy loaded
- [ ] Service Worker registered
- [ ] CSS minimized and critical CSS inlined
- [ ] Tree shaking enabled
- [ ] Source maps disabled in production
- [ ] Console logs removed

### Performance Metrics
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms

### Server
- [ ] Gzip/Brotli compression enabled
- [ ] HTTP/2 enabled
- [ ] Cache headers configured
- [ ] Security headers added
- [ ] CDN configured for static assets
- [ ] Database queries optimized
- [ ] Rate limiting implemented
- [ ] PM2 cluster mode enabled

### Testing
- [ ] Lighthouse score > 90
- [ ] Tested on slow 3G
- [ ] Tested on low-end devices
- [ ] Browser compatibility checked
- [ ] Load tested with expected traffic

## 🛠️ Tools & Resources

### Analysis Tools
- **Lighthouse**: Chrome DevTools audit
- **WebPageTest**: https://www.webpagetest.org/
- **GTmetrix**: https://gtmetrix.com/
- **Bundle Analyzer**: webpack-bundle-analyzer
- **Coverage**: Chrome DevTools Coverage tab

### Optimization Tools
- **Image Optimization**: 
  - squoosh.app
  - imagemin
  - sharp
- **CSS**: 
  - PurgeCSS
  - cssnano
- **JavaScript**:
  - Terser
  - esbuild
  - SWC

### Monitoring
- **Real User Monitoring**:
  - Google Analytics
  - Sentry Performance
- **Synthetic Monitoring**:
  - Pingdom
  - UptimeRobot

## 📝 Notes

1. **Start with performance in mind** - It's easier to maintain performance than to fix it later
2. **Measure before optimizing** - Use data to guide optimization efforts
3. **Progressive enhancement** - Start with a fast, basic experience and enhance
4. **Budget performance** - Set and enforce performance budgets
5. **Automate checks** - Use CI/CD to catch performance regressions

---

Remember: **Performance is a feature, not an afterthought!**