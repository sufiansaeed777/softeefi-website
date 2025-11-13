require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const indexRoutes = require('./routes/index')
const realUserRoutes = require('./routes/realUser')
const askRoute = require("./routes/ask")
const historyRoute = require("./routes/history")
const contactRoute = require('./routes/contact')
const subscribeRoute = require('./routes/subscribe')
const deleteSingleRoute = require("./routes/deleteSingle")
const deleteAllRoute = require("./routes/deleteAll")
const usageRoute = require("./routes/usage")
const geminiRoute = require("./routes/gemini")
// const aiRoute = require("./routes/ai")
const freeReportsRoute = require("./routes/freeReports")
const analyticsRoute = require("./routes/analytics")
const compression = require('compression')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
// Add Redis caching
const { cacheMiddleware } = require('./Utils/redisClient')

//express app
const app = express()

// Trust proxy (needed for nginx)
app.set('trust proxy', true)

// Enable compression
app.use(compression())

// Add security headers
app.use(helmet({
    contentSecurityPolicy: false, // Disable if causing issues with your frontend
}))

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
})
app.use('/api/', limiter)

//CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'https://softeefi.co.uk', 'https://www.softeefi.co.uk'],
    credentials: true
}))

//middleware
app.use(express.json())
app.use((req, res, next)=>
{
    console.log(req.path, req.method)
    next()
})

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    })
})

// Metrics endpoint for web vitals
const Metrics = require('./models/metricsModel')
app.post('/api/metrics', async (req, res) => {
    try {
        const { metric, value, rating, page, pathname, sessionId, userAgent, referrer } = req.body
        
        // Get device type from user agent
        const isMobile = /Mobile|Android|iPhone/i.test(userAgent || '')
        const isTablet = /iPad|Tablet/i.test(userAgent || '')
        const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
        
        // Create metrics entry
        await Metrics.create({
            metric,
            value,
            rating,
            page: page || pathname || 'unknown',
            pathname,
            sessionId,
            userAgent: req.headers['user-agent'],
            referrer: referrer || req.headers.referer,
            device: {
                type: deviceType
            },
            location: {
                ip: req.ip || req.connection.remoteAddress
            }
        })
        
        res.status(200).json({ success: true })
    } catch (error) {
        console.error('Metrics error:', error)
        res.status(200).json({ success: true }) // Still return success to not break frontend
    }
})

//routes
app.use('/api/index',indexRoutes)
app.use('/api/realUser',realUserRoutes)
app.use("/api/ask", askRoute);

app.use("/api/history", historyRoute)
app.use('/api/contact', contactRoute)
app.use('/api/subscribe', subscribeRoute)

app.use("/api/deleteSingle", deleteSingleRoute); 
app.use("/api/deleteAll", deleteAllRoute); 

app.use("/api/usage", usageRoute);

// Don't cache Gemini - each user question is unique!
app.use("/api/gemini", geminiRoute);

// app.use("/api/ai", aiRoute);
app.use("/api/free-reports", freeReportsRoute);

// Cache analytics for 1 hour (3600 seconds) - data doesn't change often
app.use("/api/analytics", cacheMiddleware('analytics', 3600), analyticsRoute);

//connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('Connected to MongoDB');
        //listening for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port',process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })

 