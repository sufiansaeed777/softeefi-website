const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const dotenv = require('dotenv');
const path = require('path');
const { cacheMiddleware, invalidateCache } = require('./utils/redisClient');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: ['https://softeefi.co.uk', 'https://www.softeefi.co.uk', 'http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// MongoDB connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10, // Connection pool size
      minPoolSize: 2,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

// Connect to MongoDB
connectDB();

// MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

// Import routes
const askRoutes = require('./routes/ask');
const contactRoutes = require('./routes/contact');
const freeReportsRoutes = require('./routes/freeReports');
const analyticsRoutes = require('./routes/analytics');
const aiRoutes = require('./routes/ai');

// API Routes with Redis caching

// Cache for 1 hour (3600 seconds)
app.use('/api/analytics', cacheMiddleware('analytics', 3600), analyticsRoutes);

// Cache for 30 minutes (1800 seconds) 
app.use('/api/ai', cacheMiddleware('ai', 1800), aiRoutes);

// No caching for contact forms and user submissions
app.use('/api/ask', askRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/free-reports', freeReportsRoutes);

// Cache static content endpoints
app.get('/api/services', cacheMiddleware('services', 7200), async (req, res) => {
  // Your services data
  const services = [
    { id: 1, name: 'Web Development', description: 'Custom websites and web apps' },
    { id: 2, name: 'AI Solutions', description: 'AI chatbots and automation' },
    { id: 3, name: 'Cloud Services', description: 'Cloud infrastructure and DevOps' },
  ];
  res.json(services);
});

// Health check endpoint (no caching)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    memory: process.memoryUsage(),
  });
});

// Cache invalidation endpoint (protected)
app.post('/api/cache/invalidate', (req, res) => {
  const { pattern, secret } = req.body;
  
  // Simple secret check (use proper auth in production)
  if (secret !== process.env.CACHE_INVALIDATE_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  invalidateCache(pattern || '*')
    .then(() => res.json({ success: true, message: 'Cache invalidated' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing HTTP server...');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});