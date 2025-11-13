const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const metricsSchema = new Schema({
    // Web Vitals metrics
    metric: {
        type: String,
        required: true,
        enum: ['CLS', 'FID', 'FCP', 'LCP', 'TTFB', 'INP', 'pageview', 'error']
    },
    value: {
        type: Number,
        required: true
    },
    rating: {
        type: String,
        enum: ['good', 'needs-improvement', 'poor']
    },
    
    // Page and user info
    page: {
        type: String,
        required: true
    },
    pathname: String,
    
    // User and session data
    userAgent: String,
    referrer: String,
    sessionId: String,
    userId: String,
    
    // Device info
    device: {
        type: {
            type: String,
            enum: ['mobile', 'tablet', 'desktop']
        },
        viewport: {
            width: Number,
            height: Number
        },
        screenResolution: String
    },
    
    // Location (from IP)
    location: {
        country: String,
        city: String,
        ip: String
    },
    
    // Additional context
    metadata: {
        type: Map,
        of: String
    }
}, { timestamps: true });

// Indexes for faster queries
metricsSchema.index({ createdAt: -1 });
metricsSchema.index({ metric: 1, createdAt: -1 });
metricsSchema.index({ page: 1, createdAt: -1 });
metricsSchema.index({ sessionId: 1 });

// Static method to get metrics summary
metricsSchema.statics.getSummary = async function(timeRange = 24) {
    const cutoff = new Date(Date.now() - timeRange * 60 * 60 * 1000);
    
    const summary = await this.aggregate([
        { $match: { createdAt: { $gte: cutoff } } },
        {
            $group: {
                _id: '$metric',
                avgValue: { $avg: '$value' },
                minValue: { $min: '$value' },
                maxValue: { $max: '$value' },
                count: { $sum: 1 },
                goodCount: {
                    $sum: { $cond: [{ $eq: ['$rating', 'good'] }, 1, 0] }
                },
                needsImprovementCount: {
                    $sum: { $cond: [{ $eq: ['$rating', 'needs-improvement'] }, 1, 0] }
                },
                poorCount: {
                    $sum: { $cond: [{ $eq: ['$rating', 'poor'] }, 1, 0] }
                }
            }
        }
    ]);
    
    return summary;
};

// Static method to get page views
metricsSchema.statics.getPageViews = async function(days = 7) {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    const pageViews = await this.aggregate([
        { 
            $match: { 
                metric: 'pageview',
                createdAt: { $gte: cutoff } 
            } 
        },
        {
            $group: {
                _id: {
                    page: '$page',
                    date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }
                },
                count: { $sum: 1 },
                uniqueSessions: { $addToSet: '$sessionId' }
            }
        },
        {
            $project: {
                page: '$_id.page',
                date: '$_id.date',
                views: '$count',
                uniqueViews: { $size: '$uniqueSessions' },
                _id: 0
            }
        },
        { $sort: { date: -1, views: -1 } }
    ]);
    
    return pageViews;
};

module.exports = mongoose.model('Metrics', metricsSchema);