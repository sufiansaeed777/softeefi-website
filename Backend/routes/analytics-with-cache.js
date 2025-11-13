const express = require('express');
const router = express.Router();
const Metrics = require('../models/metricsModel');
const { cacheMiddleware, cache, invalidateCache } = require('../Utils/redisClient');

// GET metrics with caching (cache for 1 hour)
router.get('/metrics', cacheMiddleware('analytics-metrics', 3600), async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const metrics = await Metrics.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          avgCLS: { $avg: '$cls' },
          avgFID: { $avg: '$fid' },
          avgLCP: { $avg: '$lcp' },
          avgFCP: { $avg: '$fcp' },
          avgTTFB: { $avg: '$ttfb' },
          totalViews: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: metrics,
      cached: false // Will be true when served from cache
    });
  } catch (error) {
    console.error('Metrics fetch error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET summary with caching (cache for 30 minutes)
router.get('/summary', cacheMiddleware('analytics-summary', 1800), async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalVisits, todayVisits, uniqueVisitors] = await Promise.all([
      Metrics.countDocuments(),
      Metrics.countDocuments({ timestamp: { $gte: today } }),
      Metrics.distinct('sessionId').then(ids => ids.length)
    ]);

    res.json({
      success: true,
      data: {
        totalVisits,
        todayVisits,
        uniqueVisitors,
        cacheStatus: 'fresh'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST new metric (invalidate cache)
router.post('/track', async (req, res) => {
  try {
    const metric = new Metrics(req.body);
    await metric.save();
    
    // Invalidate related caches when new data comes in
    await invalidateCache('analytics-*');
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;