const express = require('express')
const router = express.Router()
const requireAdmin = require('../middleware/requireAdmin')
const Metrics = require('../models/metricsModel')
const FreeReportUser = require('../models/freeReportUserModel')
const Contact = require('../models/contactModel')
const RealUser = require('../models/realUserModel')
// const Question = require('../models/questionModel') // Model doesn't exist

// Get metrics summary
router.get('/summary', requireAdmin, async (req, res) => {
    try {
        const { timeRange = 24 } = req.query
        
        // Get Web Vitals summary
        const vitals = await Metrics.getSummary(parseInt(timeRange))
        
        // Get page views for last 7 days
        const pageViews = await Metrics.getPageViews(7)
        
        // Get total counts
        const totalPageViews = await Metrics.countDocuments({ 
            metric: 'pageview',
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        })
        
        // Get unique sessions
        const uniqueSessions = await Metrics.distinct('sessionId', {
            createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
        })
        
        // Get device breakdown
        const deviceStats = await Metrics.aggregate([
            { 
                $match: { 
                    createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
                }
            },
            {
                $group: {
                    _id: '$device.type',
                    count: { $sum: 1 }
                }
            }
        ])
        
        res.json({
            vitals,
            pageViews,
            stats: {
                totalPageViews,
                uniqueSessions: uniqueSessions.length,
                deviceStats
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch analytics' })
    }
})

// Get detailed metrics
router.get('/metrics', requireAdmin, async (req, res) => {
    try {
        const { 
            metric, 
            page, 
            startDate, 
            endDate,
            limit = 100 
        } = req.query
        
        const query = {}
        
        if (metric) query.metric = metric
        if (page) query.page = page
        
        if (startDate || endDate) {
            query.createdAt = {}
            if (startDate) query.createdAt.$gte = new Date(startDate)
            if (endDate) query.createdAt.$lte = new Date(endDate)
        }
        
        const metrics = await Metrics
            .find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
        
        res.json(metrics)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch metrics' })
    }
})

// Get performance scores
router.get('/performance', requireAdmin, async (req, res) => {
    try {
        const { days = 1 } = req.query
        const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
        
        const performanceData = await Metrics.aggregate([
            { 
                $match: { 
                    metric: { $in: ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'] },
                    createdAt: { $gte: cutoff }
                }
            },
            {
                $group: {
                    _id: {
                        metric: '$metric',
                        hour: { 
                            $dateToString: { 
                                format: '%Y-%m-%d %H:00', 
                                date: '$createdAt' 
                            }
                        }
                    },
                    avgValue: { $avg: '$value' },
                    minValue: { $min: '$value' },
                    maxValue: { $max: '$value' },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    metric: '$_id.metric',
                    time: '$_id.hour',
                    avgValue: { $round: ['$avgValue', 2] },
                    minValue: 1,
                    maxValue: 1,
                    count: 1,
                    _id: 0
                }
            },
            { $sort: { time: 1, metric: 1 } }
        ])
        
        res.json(performanceData)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch performance data' })
    }
})

// Get user statistics
router.get('/users', requireAdmin, async (req, res) => {
    try {
        // Get user counts
        const totalUsers = await RealUser.countDocuments()
        const freeUsers = await RealUser.countDocuments({ plan: 'free' })
        const standardUsers = await RealUser.countDocuments({ plan: 'standard' })
        const premiumUsers = await RealUser.countDocuments({ plan: 'premium' })
        
        // Get free report users
        const freeReportUsers = await FreeReportUser.countDocuments()
        
        // Get contact submissions
        const totalContacts = await Contact.countDocuments()
        const newContacts = await Contact.countDocuments({ status: 'new' })
        
        // Get AI usage stats (disabled - Question model doesn't exist)
        const aiUsageToday = 0; // await Question.countDocuments({
        //     createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
        // })
        
        res.json({
            users: {
                total: totalUsers,
                byPlan: {
                    free: freeUsers,
                    standard: standardUsers,
                    premium: premiumUsers
                }
            },
            freeReports: freeReportUsers,
            contacts: {
                total: totalContacts,
                new: newContacts
            },
            aiUsage: {
                today: aiUsageToday
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch user statistics' })
    }
})

// Get popular pages
router.get('/popular', requireAdmin, async (req, res) => {
    try {
        const { days = 7 } = req.query
        const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
        
        const popularPages = await Metrics.aggregate([
            { 
                $match: { 
                    metric: 'pageview',
                    createdAt: { $gte: cutoff }
                }
            },
            {
                $group: {
                    _id: '$page',
                    views: { $sum: 1 },
                    uniqueSessions: { $addToSet: '$sessionId' }
                }
            },
            {
                $project: {
                    page: '$_id',
                    views: 1,
                    uniqueViews: { $size: '$uniqueSessions' },
                    _id: 0
                }
            },
            { $sort: { views: -1 } },
            { $limit: 10 }
        ])
        
        res.json(popularPages)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch popular pages' })
    }
})

module.exports = router