const mongoose = require('mongoose')

const Schema = mongoose.Schema

const freeReportUserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    occupation: {
        type: String,
        required: true
    },
    accessGrantedAt: {
        type: Date,
        default: Date.now
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    }
}, { timestamps: true })

// Add index for email to ensure uniqueness and faster queries
freeReportUserSchema.index({ email: 1 })

module.exports = mongoose.model('FreeReportUser', freeReportUserSchema)